import { join as path_join } from 'path';
import fs from 'fs';

class CreateDomain {
  constructor() {
    this.indexes = {};
    this.alloweds = ['Add', 'Delete', 'Detail', 'List', 'Edit', 'index.js'];
    this.names = {
      validators: {
        imports: 'import $__domain__$ $__name__$ ' +
          'from \'./$__domain__$ $__name__$.js\';',
        exports: '$__domain__$ $__name__$,'
      },
      controllers: {
        imports: 'import $__domain__$ $__name__$ ' +
          'from \'./$__domain__$ $__name__$.js\';',
        exports: '$__domain__$ $__name__$,'
      }
    };
  }

  getArgs () {
    const args = {};
  
    for (const i of process.argv.slice(2)) {
      if (i.slice(0, 2) === '--') {
        const name = i.split('=');
        args[name[0].slice(2)] = name[1] || true;
      }
    }
  
    return args;
  }

  async process() {
    if (process.argv.length <= 2) {
      console.error('Please specify the domain name');
      process.exit(1);
    }
    
    const args = this.getArgs();

    this.domainNameInput = process.argv[2];
    this.ignoreDeads = args['no-dead'] || false;
    this.simpleCrud = args['simple-crud'] || false;

    if (this.checkDomainExists()) {
      console.error('Domain already exists');
      process.exit(1);
    }

    this.createDomainName(process.argv[2]);

    fs.mkdirSync('src/domains/' + this.domainNameLow);

    this.walkFolder('kernel/stubs');
    this.createRoutes();
  }

  checkDomainExists() {
    return fs.existsSync(`src/domains/${this.domainNameLow}`);
  }

  createFolder(folder) {
    if (!fs.existsSync(`src/domains/${this.domainNameLow}/${folder}`)) {
      fs.mkdirSync(`src/domains/${this.domainNameLow}/${folder}`);
      console.log(`\nCreated folder src/domains/${this.domainNameLow}/${folder}`);
    }
  }

  createFile(file, content) {
    file = file
      .replace(/\$__domain__\$/g, this.domainName)
      .replace(/\$__domain_low__\$/g, this.domainNameLow);

    content = content
      .replace(/\$__domain__\$/g, this.domainName)
      .replace(/\$__domain_low__\$/g, this.domainNameLow)
      .replace(/\$__domain_input__\$/g, this.domainNameInput)
      .split('\n')
      .slice(1)
      .join('\n');

    fs.writeFileSync(`src/domains/${this.domainNameLow}/${file}`, content);
    console.log(`Created file src/domains/${this.domainNameLow}/${file}`);
  }

  createDomainName(domain) {
    this.domainName = domain
      .split('_')
      .map(e => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase())
      .join('');

    this.domainNameLow = this.domainName
      .charAt(0)
      .toLowerCase() + this.domainName.slice(1);
  }

  createIndex(stubs, name, path) {
    let content = fs.readFileSync(
      `src/domains/${this.domainNameLow}` 
        + path.replace('kernel/stubs', '') + '/index.js',
      {
        encoding: 'utf8',
      }
    );

    for (const i of stubs) {
      const filename = i
        .replace('$__domain__$', '')
        .replace('.js', '');

      content = content
        .replace(
          '$__exports__$',
          this.names[name].exports + 
          '\n  $__exports__$'
        )
        .replace(
          '$__imports__$',
          this.names[name].imports + 
          '\n$__imports__$'
        )
        .replace(
          /\$__name__\$/g,
          filename
        )
        .replace(
          /\$__domain__\$ /g,
          this.domainName
        );
    }

    content = content
      .replace('$__exports__$\n', '')
      .replace('$__imports__$\n', '')
      .replace('  }', '}');

    this.createFile(
      path.replace('kernel/stubs', '') + '/index.js',
      content,
    );
  }

  isIgnoredPath(path) {
    if (
      this.ignoreDeads &&
      path.includes('Dead')
    ) {
      return false;
    }

    if (
      this.simpleCrud &&
      path.includes('.js') &&
      !this.alloweds.some(e => path.includes(e))
    ) {
      return false;
    }

    return true;
  }

  getDeadControllers() {
    let deadListControllerImport = '';
    let deadDetailControllerImport = '';
    let deadListController = '';
    let deadDetailController = '';
  
    if (!this.ignoreDeads) {
      deadListControllerImport = `  ${this.domainName}DeadListController,`;
      deadDetailControllerImport = `  ${this.domainName}DeadDetailController,`;
      deadListController = `${this.domainNameLow}Router.get(\n`
        + '  \'/dead_list\',\n'
        + '  (req, res) => '
        + `new ${this.domainName}DeadListController().process(req, res)\n`
        + ');\n';
      
      deadDetailController = `${this.domainNameLow}Router.get(\n`
        + '  \'/dead_detail/:id\',\n'
        + '  (req, res) => '
        + `new ${this.domainName}DeadDetailController().process(req, res)\n`
        + ');\n';
    }

    return {
      deadListControllerImport,
      deadDetailControllerImport,
      deadListController,
      deadDetailController,
    };
  }

  getBulkControllers() {
    let bulkController = '';
    let bulkValidatorImport = '';
    let bulkControllerImport = '';

    if (!this.simpleCrud) {
      bulkValidatorImport = `  ${this.domainName}BulkValidator,`;
      bulkControllerImport = `  ${this.domainName}BulkController,`;
      bulkController = `${this.domainNameLow}Router.post(`
        + '  \'/bulk\',\n'
        + `  new ${this.domainName}BulkValidator().getValidations(),\n`
        + `  new ${this.domainName}BulkValidator().checkRules,\n`
        + `  (req, res) => new ${this.domainName}BulkController().process(req, res)\n`
       + ');';
    }

    return {
      bulkController,
      bulkValidatorImport,
      bulkControllerImport,
    };
  }

  createRoutes() {
    const file = 'kernel/stubs/routes/$__domain_low__$.js';

    let content = fs.readFileSync(file, {encoding: 'utf8'})
      .replace(/\$__domain__\$/g, this.domainName)
      .replace(/\$__domain_low__\$/g, this.domainNameLow);

    const {
      deadListControllerImport,
      deadDetailControllerImport,
      deadListController,
      deadDetailController
    } = this.getDeadControllers();

    const {
      bulkController,
      bulkValidatorImport,
      bulkControllerImport,
    } = this.getBulkControllers();

    content = content
      .replace('$__dead_list__$;', deadListController)
      .replace('$__dead_detail__$;', deadDetailController)
      .replace('$__bulk__$;', bulkController)
      .replace('  $__dead_list_controller__$,', deadListControllerImport)
      .replace('  $__dead_detail_controller__$,', deadDetailControllerImport)
      .replace('  $__bulk_controller__$,', bulkControllerImport)
      .replace('  $__bulk_validator__$,', bulkValidatorImport)
      .replace(/\n\n+/g, '\n\n');

    fs.writeFileSync(
      file
        .replace('kernel/stubs/', '')
        .replace(/\$__domain_low__\$/g, this.domainNameLow),
      content
    );

    this.appendRouter();
  }

  appendRouter() {
    const file = 'routes/index.js';
    let content = fs.readFileSync(file, {encoding: 'utf8'}).split('\n');

    for (let i = 0; i < content.length; i++) {
      if (!content[i].startsWith('import')) {
        content.splice(
          i,
          0,
          `import { ${this.domainNameLow}Router } from './${this.domainNameLow}.js';`
        );

        break;
      }
    }

    content.push(
      `indexRoute.use('/${this.domainNameInput}', ${this.domainNameLow}Router);`
    );

    fs.writeFileSync(
      file,
      content.join('\n'),
    );
  }

  walkFolder(path) {
    const files = fs.readdirSync(path);
    const paths = [];

    for (const i of files) {
      const item = fs.lstatSync(path_join(path, i));

      if (i === 'routes') {
        continue;
      }

      if (!this.isIgnoredPath(i)) {
        continue;
      }

      paths.push(i);

      if (item.isFile()) {
        this.createFile(
          path_join(path, i).replace('kernel/stubs/', ''),
          fs.readFileSync(
            path_join(path, i),
            {
              encoding: 'utf8',
            }
          )
        );

        continue;
      }

      this.createFolder(path_join(path, i).replace('kernel/stubs/', ''));
      
      const p = this.walkFolder(path_join(path, i));

      if (p.includes('index.js')) {
        p.splice(p.indexOf('index.js'), 1);

        this.indexes[i] = p;
        this.createIndex(p, i, path_join(path, i));
      }
    }

    return paths;
  }
}

new CreateDomain().process();

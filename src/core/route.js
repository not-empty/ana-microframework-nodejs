const fs = require('fs');

class Route {
  constructor() {
    this.routeDir = `${process.cwd()}/routes/`;
  }

  getRouteDir() {
    return this.routeDir;
  }

  getRouteList() {
    const routeList = new Map();
    fs.readdirSync(this.routeDir).forEach((file) => {
      const domain = file.replace('.js', '');
      const router = this.routeDir + domain;

      routeList.set(domain, router);
    });

    return routeList;
  }
}

module.exports = new Route();

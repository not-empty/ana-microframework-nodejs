// eslint-disable-next-line max-len
import $__domain__$ListBusiness from '../businesses/$__domain__$ListBusiness.js';
import Response from '#src/core/response.js';

class $__domain__$ListController {
  constructor() {
    this.$__domain_low__$ListBusiness = new $__domain__$ListBusiness();
    this.response = new Response();
  }

  async process(req, res) {
    const process = await this.$__domain_low__$ListBusiness.process(res.locals);

    res.send(
      this.response.send(
        res.locals.token,
        process,
      ),
    );
  }
}

export default $__domain__$ListController;

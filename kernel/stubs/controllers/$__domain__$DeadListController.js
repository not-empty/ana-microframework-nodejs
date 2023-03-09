// eslint-disable-next-line max-len
import $__domain__$DeadListBusiness from '../businesses/$__domain__$DeadListBusiness.js';
import Response from '#src/core/response.js';

class $__domain__$DeadListController {
  constructor() {
    this.$__domain_low__$DeadListBusiness = new $__domain__$DeadListBusiness();
    this.response = new Response();
  }

  async process(req, res) {
    const process = await this.$__domain_low__$DeadListBusiness.process(res.locals);

    res.send(
      this.response.send(
        res.locals.token,
        process,
      ),
    );
  }
}

export default $__domain__$DeadListController;

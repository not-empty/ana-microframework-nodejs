// eslint-disable-next-line max-len
import $__domain__$BulkBusiness from '../businesses/$__domain__$BulkBusiness.js';
import Response from '#src/core/response.js';

class $__domain__$BulkController {
  constructor() {
    this.$__domain_low__$BulkBusiness = new $__domain__$BulkBusiness();
    this.response = new Response();
  }

  async process(req, res) {
    const process = await this.$__domain_low__$BulkBusiness.process(req.body);

    res.send(
      this.response.send(
        res.locals.token,
        process,
      ),
    );
  }
}

export default $__domain__$BulkController;

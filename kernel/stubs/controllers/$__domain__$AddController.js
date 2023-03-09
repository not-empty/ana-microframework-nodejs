// eslint-disable-next-line max-len
import $__domain__$AddBusiness from '../businesses/$__domain__$AddBusiness.js';
import Response from '#src/core/response.js';

class $__domain__$AddController {
  constructor() {
    this.$__domain_low__$AddBusiness = new $__domain__$AddBusiness();
    this.response = new Response();
  }

  async process(req, res) {
    const process = await this.$__domain_low__$AddBusiness.process(req.body);

    res.send(
      this.response.send(
        res.locals.token,
        process,
      ),
    );
  }
}

export default $__domain__$AddController;

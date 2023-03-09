// eslint-disable-next-line max-len
import $__domain__$EditBusiness from '../businesses/$__domain__$EditBusiness.js';
import Response from '#src/core/response.js';

class $__domain__$EditController {
  constructor() {
    this.$__domain_low__$EditBusiness = new $__domain__$EditBusiness();
    this.response = new Response();
  }

  async process(req, res) {
    const { id } = req.params;
    const process = await this.$__domain_low__$EditBusiness.process(id, req.body);

    res.send(
      this.response.send(
        res.locals.token,
        process,
      ),
    );
  }
}

export default $__domain__$EditController;

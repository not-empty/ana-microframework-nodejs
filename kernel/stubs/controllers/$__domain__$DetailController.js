// eslint-disable-next-line max-len
import $__domain__$DetailBusiness from '../businesses/$__domain__$DetailBusiness.js';
import Response from '#src/core/response.js';

class $__domain__$DetailController {
  constructor() {
    this.$__domain_low__$DetailBusiness = new $__domain__$DetailBusiness();
    this.response = new Response();
  }

  async process(req, res) {
    const { id } = req.params;

    const process = await this.$__domain_low__$DetailBusiness.process(id);
    if (!Object.keys(process).length) {
      res.status(404).send(
        this.response.send(
          res.locals.token,
          [],
          'Data not found',
        ),
      );

      return false;
    }

    res.send(
      this.response.send(
        res.locals.token,
        process,
      ),
    );
  }
}

export default $__domain__$DetailController;

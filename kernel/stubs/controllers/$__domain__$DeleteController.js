// eslint-disable-next-line max-len
import $__domain__$DeleteBusiness from '../businesses/$__domain__$DeleteBusiness.js';
import Response from '#src/core/response.js';

class $__domain__$DeleteController {
  constructor() {
    this.$__domain_low__$DeleteBusiness = new $__domain__$DeleteBusiness();
    this.response = new Response();
  }

  async process(req, res) {
    const { id } = req.params;

    const process = await this.$__domain_low__$DeleteBusiness.process(id);
    if (process === false) {
      res.status(404).send(
        this.response.send(
          res.locals.token,
          [],
          'Data not found',
        ),
      );

      return false;
    }

    res.status(204).send('');
  }
}

export default $__domain__$DeleteController;

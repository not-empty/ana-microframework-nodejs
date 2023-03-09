// eslint-disable-next-line max-len
import $__domain__$DeadDetailBusiness from '../businesses/$__domain__$DeadDetailBusiness.js';
import Response from '#src/core/response.js';

class $__domain__$DeadDetailController {
  constructor() {
    this.$__domain_low__$DeadDetailBusiness = new $__domain__$DeadDetailBusiness();
    this.response = new Response();
  }

  async process(req, res) {
    const { id } = req.params;

    const process = await this.$__domain_low__$DeadDetailBusiness.process(id);
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

export default $__domain__$DeadDetailController;

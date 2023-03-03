import UserDeadDetailBusiness from '../businesses/UserDeadDetailBusiness.js';
import { Response } from '#src/core/response.js';

class UserDeadDetailController {
  constructor() {
    this.userDeadDetailBusiness = UserDeadDetailBusiness;
    this.response = new Response();
  }

  async process(req, res) {
    const { id } = req.params;

    const process = await this.userDeadDetailBusiness.process(id);
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

export default new UserDeadDetailController;

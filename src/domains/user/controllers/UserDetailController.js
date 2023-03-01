import { Response } from "../../../core/response.js";
import UserDetailBusiness from '../businesses/UserDetailBusiness.js';

class UserDetailController {
  constructor() {
    this.userDetailBusiness = UserDetailBusiness;
    this.response = new Response();
  }

  async process(req, res) {
    const id = req.params.id;

    const process = await this.userDetailBusiness.process(id);
    if (!Object.keys(process).length) {
      res.status(404).send(
        this.response.send(
          res.locals.token,
          [],
          'Data not found'
        )
      );

      return false;
    }

    res.send(
      this.response.send(
        res.locals.token,
        process
      )
    );
  }
}

export default new UserDetailController;

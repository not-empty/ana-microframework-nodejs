import UserBulkBusiness from '../businesses/UserBulkBusiness.js';
import { Response } from "../../../core/response.js";

class UserBulkController {
  constructor() {
    this.userBulkBusiness = UserBulkBusiness;
    this.response = new Response();
  }

  async process(req, res) {
    const process = await this.userBulkBusiness.process(req.body);

    res.send(
      this.response.send(
        res.locals.token,
        process,
      ),
    );
  }
}

export default new UserBulkController;

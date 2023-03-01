import { Response } from "../../../core/response.js";
import UserListBusiness from '../businesses/UserListBusiness.js';

class UserListController {
  constructor() {
    this.userListBusiness = UserListBusiness;
    this.response = new Response();
  }

  async process(req, res) {
    const process = await this.userListBusiness.process(res.locals);

    res.send(
      this.response.send(
        res.locals.token,
        process
      )
    );
  }
}

export default new UserListController;

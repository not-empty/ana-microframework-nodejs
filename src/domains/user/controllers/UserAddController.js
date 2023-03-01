import UserAddBusiness from '../businesses/UserAddBusiness.js';
import { Response } from '../../../core/response.js';

class UserAddController {
  constructor() {
    this.userAddBusiness = UserAddBusiness;
    this.response = new Response();
  }

  async process(req, res) {
    const process = await this.userAddBusiness.process(req.body);

    res.send(
      this.response.send(
        res.locals.token,
        process,
      ),
    );
  }
}

export default new UserAddController;

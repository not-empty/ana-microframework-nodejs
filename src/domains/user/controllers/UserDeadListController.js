import Response from '#src/core/response.js';
import UserDeadListBusiness from '../businesses/UserDeadListBusiness.js';

class UserDeadListController {
  constructor() {
    this.userDeadListBusiness = new UserDeadListBusiness();
    this.response = new Response();
  }

  async process(req, res) {
    const process = await this.userDeadListBusiness.process(res.locals);

    res.send(
      this.response.send(
        res.locals.token,
        process,
      ),
    );
  }
}

export default UserDeadListController;

import Response from '#src/core/response.js';
import UserEditBusiness from '../businesses/UserEditBusiness.js';

class UserEditController {
  constructor() {
    this.userEditBusiness = new UserEditBusiness();
    this.response = new Response();
  }

  async process(req, res) {
    const { id } = req.params;
    const process = await this.userEditBusiness.process(id, req.body);

    res.send(
      this.response.send(
        res.locals.token,
        process,
      ),
    );
  }
}

export default UserEditController;

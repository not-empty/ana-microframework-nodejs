const Response = require('../../../core/response');
const UserListBusiness = require('../businesses/UserListBusiness');

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

module.exports = new UserListController();

const Response = require('../../../core/response');
const UserDeadListBusiness = require('../businesses/UserDeadListBusiness');

class UserDeadListController {
  constructor() {
    this.userDeadListBusiness = UserDeadListBusiness;
    this.response = new Response();
  }

  async process(req, res) {
    const process = await this.userDeadListBusiness.process(res.locals);

    res.send(
      this.response.send(
        res.locals.token,
        process
      )
    );
  }
}

module.exports = new UserDeadListController();

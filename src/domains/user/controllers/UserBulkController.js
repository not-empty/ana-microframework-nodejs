const UserBulkBusiness = require('../businesses/UserBulkBusiness');
const Response = require('../../../core/response');

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
        process
      )
    );
  }
}

module.exports = new UserBulkController();

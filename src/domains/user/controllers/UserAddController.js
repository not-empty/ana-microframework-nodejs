const UserAddBusiness = require('../businesses/UserAddBusiness');
const Response = require('../../../core/response');

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

module.exports = new UserAddController();

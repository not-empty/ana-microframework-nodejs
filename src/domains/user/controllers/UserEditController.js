const Response = require('../../../core/response');
const UserEditBusiness = require('../businesses/UserEditBusiness');

class UserEditController {
  constructor() {
    this.userEditBusiness = UserEditBusiness;
    this.response = new Response();
  }

  async process(req, res) {
    const id = req.params.id;
    const process = await this.userEditBusiness.process(id, req.body);

    res.send(
      this.response.send(
        res.locals.token,
        process
      )
    );
  }
}

module.exports = new UserEditController();

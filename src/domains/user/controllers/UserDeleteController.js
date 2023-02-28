const UserDeleteBusiness = require('../businesses/UserDeleteBusiness');
const Response = require('../../../core/response');

class UserDeleteController {
  constructor() {
    this.userDeleteBusiness = UserDeleteBusiness;
    this.response = new Response();
  }

  async process(req, res) {
    const { id } = req.params;

    const process = await this.userDeleteBusiness.process(id);
    if (process === false) {
      res.status(404).send(
        this.response.send(
          res.locals.token,
          [],
          'Data not found',
        ),
      );

      return false;
    }

    res.status(204).send('');
  }
}

module.exports = new UserDeleteController();

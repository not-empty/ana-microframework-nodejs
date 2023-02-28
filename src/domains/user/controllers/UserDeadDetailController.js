const UserDeadDetailBusiness = require('../businesses/UserDeadDetailBusiness');
const Response = require('../../../core/response');

class UserDeadDetailController {
  constructor() {
    this.userDeadDetailBusiness = UserDeadDetailBusiness;
    this.response = new Response();
  }

  async process(req, res) {
    const { id } = req.params;

    const process = await this.userDeadDetailBusiness.process(id);
    if (!Object.keys(process).length) {
      res.status(404).send(
        this.response.send(
          res.locals.token,
          [],
          'Data not found',
        ),
      );

      return false;
    }

    res.send(
      this.response.send(
        res.locals.token,
        process,
      ),
    );
  }
}

module.exports = new UserDeadDetailController();

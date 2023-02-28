const AuthBusiness = require('../businesses/AuthBusiness');
const Response = require('../../../core/response');

class AuthController {
  constructor() {
    this.AuthBusiness = AuthBusiness;
    this.response = new Response();
  }

  async process(req, res) {
    const process = this.AuthBusiness.process(req.body);
    if (process === null) {
      res.status(401).send(
        this.response.send(
          null,
          [],
          'Invalid credentials'
        )
      );

      return false;
    }

    res.send(
      this.response.send(
        process.token,
        process
      )
    );
  }
}

module.exports = new AuthController();

import { Response } from '../../../core/response.js';
import AuthBusiness from '../businesses/AuthBusiness.js';
class AuthController {
  constructor() {
    this.AuthBusiness = AuthBusiness;
    this.response = new Response();
  }

  async process(req, res) {
    const process = await this.AuthBusiness.process(req.body);
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

export default new AuthController;

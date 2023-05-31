import Response from '#src/core/response.js';

import AuthBusiness from '../businesses/AuthBusiness.js';

class AuthController {
  constructor() {
    this.authBusiness = new AuthBusiness();
    this.response = new Response();
  }

  async process(req, res) {
    const process = await this.authBusiness.process(req.body);
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

export default AuthController;

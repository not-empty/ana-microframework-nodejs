import token from '#src/config/token.js';

import Jwt from '#src/core/jwt.js';

class AuthBusiness {
  constructor() {
    this.jwt = new Jwt();
    this.token = token;
  }

  async process(params) {
    const context = this.getContextFromCredential(params);
    if (context === null) {
      return null;
    }

    const token = await this.jwt.getToken(context);

    return {
      token,
      valid_until: this.jwt.getDateLocaleString(),
    };
  }

  getContextFromCredential(params) {
    if (
      typeof this.token[params.token] !== 'undefined' &&
      this.token[params.token].secret === params.secret
    ) {
      return this.token[params.token].name;
    }

    return null;
  }
}

export default AuthBusiness;

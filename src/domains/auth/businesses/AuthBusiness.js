import token from '#src/config/token.js';
import Jwt from '#src/core/jwt.js';

class AuthBusiness {
  async process(params) {
    const context = this.getContextFromCredential(params);
    if (context === null) {
      return null;
    }

    const jwt = new Jwt();
    const token = await jwt.getToken(context);

    return {
      token,
      valid_until: jwt.getDateLocaleString(),
    };
  }

  getContextFromCredential(params) {
    if (
      typeof token[params.token] !== 'undefined' &&
      token[params.token].secret === params.secret
    ) {
      return token[params.token].name;
    }

    return null;
  }
}

export default AuthBusiness;

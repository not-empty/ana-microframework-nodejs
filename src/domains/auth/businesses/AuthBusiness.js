import token from "../../../config/token.js";
import jwt from "../../../core/jwt.js";

class AuthBusiness {
  async process(params) {
    const context = this.getContextFromCredential(params);
    if (context === null) {
      return null;
    }

    const token = await jwt.getToken(context);

    return {
      token,
      // valid_until: jwt.getDateLocaleString(),
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

export default new AuthBusiness;

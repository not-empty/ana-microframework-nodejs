const token = require('../../../config/token');
const jwt = require('../../../core/jwt');

class AuthBusiness {
  process(params) {
    const context = this.getContextFromCredential(params);
    if (context == null) {
      return null;
    }

    const token = jwt.getToken(context);

    return {
      token,
      valid_until: jwt.getDateLocaleString(),
    };
  }

  getContextFromCredential(params) {
    if (
      token[params.token] != undefined &&
      token[params.token].secret == params.secret
    ) {
      return token[params.token].name
    }

    return null;
  }
}

module.exports = new AuthBusiness();

const Response = require('../core/response');
const jwt = require('../core/jwt');

const response = new Response();

class JwtMiddleware {
  process(req, res, next) {
    const authorization = req.get('Authorization');
    const context = req.get('Context');

    if (
        authorization == undefined ||
        !authorization.length
    ) {
      res.status(401).send(
        response.send(
          null,
          [],
          'Invalid token or expired token',
        )
      );
  
      return false;
    }

    const token = jwt.verifyToken(authorization, context);
    if (token === false) {
      res.status(401).send(
        response.send(
          null,
          [],
          'Invalid token or expired token',
        )
      );

      return false;
    }

    res.locals.token = token;
    next();
  }
}

module.exports = new JwtMiddleware();

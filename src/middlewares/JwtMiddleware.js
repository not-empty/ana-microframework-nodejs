import Response from '#src/core/response.js';
import jwt from '#src/core/jwt.js';

class JwtMiddleware {
  constructor() {
    this.response = new Response();
  }

  async process(req, res, next) {
    const authorization = req.get('Authorization');
    const context = req.get('Context');

    if (
      typeof authorization === 'undefined' ||
      !authorization.length
    ) {
      res.status(401).send(
        this.response.send(
          null,
          [],
          'Invalid token or expired token',
        ),
      );

      return false;
    }

    const token = await jwt.verifyToken(authorization, context);
    if (token === false) {
      res.status(401).send(
        this.response.send(
          null,
          [],
          'Invalid token or expired token',
        ),
      );

      return false;
    }

    res.locals.token = token;
    next();
  }
}

export default JwtMiddleware;

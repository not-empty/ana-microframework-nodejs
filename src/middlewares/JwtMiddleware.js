import Response from '#src/core/response.js';
import Jwt from '#src/core/jwt.js';

class JwtMiddleware {
  async process(req, res, next) {
    const response = new Response();
    const jwt = new Jwt();

    const authorization = req.get('Authorization');
    const context = req.get('Context');

    if (
      typeof authorization === 'undefined' ||
      !authorization.length
    ) {
      res.status(401).send(
        response.send(
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
        response.send(
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

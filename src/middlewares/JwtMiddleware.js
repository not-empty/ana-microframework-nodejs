import { Response } from "../core/response.js";
import jwt from "../core/jwt.js";

const response = new Response();

class JwtMiddleware {
  async process(req, res, next) {
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

export default new JwtMiddleware;

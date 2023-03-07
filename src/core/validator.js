import { validationResult } from 'express-validator';
import Response from './response.js';

class Validator {
  constructor(rules) {
    this.response = new Response();
    this.validationBodyRules = rules;
  }

  getValidations() {
    return this.validationBodyRules;
  }

  checkRules(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).send(
      this.response.send(
        res.locals.token,
        errors.array(),
        'A validation error occurrs'
      )
    );

    return false;
  }
}

export default Validator;

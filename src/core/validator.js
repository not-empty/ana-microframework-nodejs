const { validationResult } = require('express-validator');
const Response = require('./response');

const response = new Response();

class Validator {
  constructor(rules) {
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
      response.send(
        res.locals.token,
        errors.array(),
        'A validation error occurrs'
      )
    );

    return false;
  };
}

module.exports = Validator;
const { body } = require('express-validator');
const validator = require('../../../core/validator');

class UserAddValidator extends validator {
  constructor() {
    super([
      body('nome', 'Name is required').exists(),
      body('nome', 'Name is empty').notEmpty(),
    ]);
  }
}

module.exports = new UserAddValidator();

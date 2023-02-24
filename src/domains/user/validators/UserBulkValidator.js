const validator = require('../../../core/validator');
const { body } = require('express-validator');

class UserBulkValidator extends validator {
  constructor() {
    super([
      body('ids', 'Name is required').exists(),
      body('ids', 'Name is empty').notEmpty(),
    ]);
  }
}

module.exports = new UserBulkValidator();

import { body } from 'express-validator';
import { Validator } from '#src/core/validator.js';

class UserBulkValidator extends Validator {
  constructor() {
    super([
      body('nome', 'Name is required').exists(),
      body('nome', 'Name is empty').notEmpty(),
    ]);
  }
}

export default new UserBulkValidator;

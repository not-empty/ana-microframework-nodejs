import { body } from 'express-validator';
import { Validator } from '../../../core/validator.js';

class UserBulkValidator extends Validator {
  constructor() {
    super([
      body('ids', 'Name is required').exists(),
      body('ids', 'Name is empty').notEmpty(),
    ]);
  }
}

export default new UserBulkValidator;

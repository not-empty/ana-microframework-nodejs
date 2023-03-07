import Validator  from '#src/core/validator.js';
import { body } from 'express-validator';

class UserAddValidator extends Validator {
  constructor() {
    super([
      body('nome', 'Name is required').exists(),
      body('nome', 'Name is empty').notEmpty(),
    ]);
  }
}

export default UserAddValidator;

// eslint-disable-next-line max-len
import Validator  from '#src/core/validator.js';
import { body } from 'express-validator';

class $__domain__$AddValidator extends Validator {
  constructor() {
    super([
      body('FIELD', 'Name is required').exists(),
      body('FIELD', 'Name is empty').notEmpty(),
    ]);
  }
}

export default $__domain__$AddValidator;

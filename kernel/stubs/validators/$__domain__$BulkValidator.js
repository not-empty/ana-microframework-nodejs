// eslint-disable-next-line max-len
import Validator from '#src/core/validator.js';
import { body } from 'express-validator';

class $__domain__$BulkValidator extends Validator {
  constructor() {
    super([
      body('ids', 'Name is required').exists(),
      body('ids', 'Name is empty').notEmpty(),
    ]);
  }
}

export default $__domain__$BulkValidator;

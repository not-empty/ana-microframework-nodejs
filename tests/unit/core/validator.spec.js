import { validationResult } from 'express-validator';
import Response from '#src/core/response.js';
import Validator from '#src/core/validator.js';

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

describe('Validator', () => {
  let validator;
  let req;
  let res;
  let next;

  beforeEach(() => {
    validator = new Validator(['rule1', 'rule2']);
    req = {};
    res = {
      locals: {
        token: 'mockedToken',
      },
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getValidations', () => {
    test('should return the validation rules', () => {
      const result = validator.getValidations();
      expect(result).toEqual(['rule1', 'rule2']);
    });
  })
});

import { validationResult } from 'express-validator';
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
    next = jest.fn(() => 'next()');
  });

  describe('getValidations', () => {
    test('should return the validation rules', () => {
      const result = validator.getValidations();
      expect(result).toEqual(['rule1', 'rule2']);
    });
  });

  describe('checkRules', () => {
    test('should return next if error is empty', () => {
      validationResult.mockImplementation(() => ({
        isEmpty: jest.fn(() => true),
      }));

      const result = validator.checkRules(req, res, next);
      expect(result).toEqual('next()');
    });

    test('should return next if error is empty', () => {
      validationResult.mockImplementation(() => ({
        isEmpty: jest.fn(() => false),
        array: jest.fn(() => []),
      }));
      validator.response.send = jest.fn(() => 'response.send()');

      const result = validator.checkRules(req, res, next);
      expect(result).toEqual(false);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.send).toHaveBeenCalledWith('response.send()');

      expect(validator.response.send)
        .toHaveBeenCalledWith(
          res.locals.token,
          [],
          'A validation error occurrs'
        );
    });
  });
});

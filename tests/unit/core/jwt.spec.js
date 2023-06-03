import Jwt from '#src/core/jwt.js';
import jwt from 'jose';

const mockSign = jest.fn(() => 'signToken');

jest.mock('jose', () => ({
  SignJWT: jest.fn(() => {
    return {
      setProtectedHeader: jest.fn().mockReturnThis(),
      setAudience: jest.fn().mockReturnThis(),
      sign: mockSign,
    }
  }),
  jwtVerify: jest.fn(),
}));

describe('Jwt', () => {
  let jwtInstance;

  beforeEach(() => {
    jwtInstance = new Jwt();
  });

  describe('getToken', () => {
    test('should return a signed JWT token', async () => {
      jwtInstance.jwtSecret = 'secretEncoded';

      const token = await jwtInstance.getToken('mockedContext');
      expect(mockSign).toHaveBeenCalledTimes(1);
      expect(token).toEqual('signToken');
      expect(jwt.SignJWT).toHaveBeenCalledTimes(1);
    });
  });

  describe('verifyToken', () => {
    test('should return false if an error occurred on validation', async () => {
      jwt.jwtVerify.mockImplementation(() => {
        throw new Error()
      });

      const token = await jwtInstance.verifyToken('token', 'context');
      expect(token).toEqual(false);
      expect(jwt.jwtVerify).toThrow(new Error());
    });

    test('should return false if audience is invalid', async () => {
      jwt.jwtVerify.mockReturnValue({
        payload: {
          aud: 'invalid',
        },
      });

      const token = await jwtInstance.verifyToken('token', 'context');
      expect(token).toEqual(false);
    });

    test('should return new token if token and context is valid', async () => {
      jwt.jwtVerify.mockReturnValue({
        payload: {
          aud: 'context',
        },
      });
      jwtInstance.diffMinutes = jest.fn(() => 4);
      jwtInstance.getToken = jest.fn(() => 'newToken');

      const token = await jwtInstance.verifyToken('token', 'context');
      expect(token).toEqual('newToken');
    });
  });

  describe('diffMinutes', () => {
    test('should return diff minutes', () => {
      const expire = Date.now() + (60 * 15);
      const diff = jwtInstance.diffMinutes(expire);
      expect(typeof diff).toBe('number');
      expect(expire).toBeGreaterThan(diff);
    });

    test('should throw error for invalid expire value', () => {
      let diff = jwtInstance.diffMinutes('invalid');
      expect(isNaN(diff)).toBe(true);
      diff = jwtInstance.diffMinutes({});
      expect(isNaN(diff)).toBe(true);
    });
  });

  describe('getDateLocaleString', () => {
    test('should return locale string', () => {
      jwtInstance.validUntil = new Date(2023, 0, 21);
      const dateString = jwtInstance.getDateLocaleString();
      expect(typeof dateString).toBe('string');
      expect(dateString.includes('21/01/2023')).toBe(true);
    });
  });
});

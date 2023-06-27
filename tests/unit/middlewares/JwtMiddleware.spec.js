import JwtMiddleware from '#src/middlewares/JwtMiddleware';

const mockResponseSend = jest.fn(() => {});
jest.mock('#src/core/response.js', () => {
  return jest.fn().mockImplementation(() => ({
    send: mockResponseSend,
  }));
});

const mockVerifyToken = jest.fn(() => {});
jest.mock('#src/core/jwt.js', () => {
  return jest.fn().mockImplementation(() => ({
    verifyToken: mockVerifyToken,
  }));
});

describe('JwtMiddleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = new Map([
      [ 'Authorization', 'token' ],
      [ 'Context', 'test-context' ]
    ]);
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      locals: {},
    };
    next = jest.fn();
  });

  describe('process', () => {
    test('should return 401 and send error response if authorization header is missing', async () => {
      const jwtMiddleware = new JwtMiddleware();
      req.set('Authorization', undefined);
      const result = await jwtMiddleware.process(req, res, next);

      expect(result).toBe(false);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(mockResponseSend).toHaveBeenCalledWith(
        null,
        [],
        'Invalid token or expired token'
      );
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 and send error response if token verification fails', async () => {
      const jwtMiddleware = new JwtMiddleware();
      mockVerifyToken.mockReturnValue(false);
      const result = await jwtMiddleware.process(req, res, next);

      expect(result).toBe(false);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(mockResponseSend).toHaveBeenCalledWith(
        null,
        [],
        'Invalid token or expired token'
      );
      expect(next).not.toHaveBeenCalled();
    });

    test('should set token in res.locals and call next if token verification succeeds', async () => {
      const jwtMiddleware = new JwtMiddleware();
      mockVerifyToken.mockReturnValue('verifiedToken');
      const result = await jwtMiddleware.process(req, res, next);

      expect(result).toBe(undefined);
      expect(res.status).not.toHaveBeenCalled();
      expect(mockResponseSend).not.toHaveBeenCalled();
      expect(res.locals.token).toBe('verifiedToken');
      expect(next).toHaveBeenCalled();
    });
  });
});

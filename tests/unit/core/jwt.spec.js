import Jwt from '#src/core/jwt.js';

describe('Jwt', () => {
  let originalDateNow;

  beforeAll(() => {
    originalDateNow = Date.now;
    global.Date.now = jest.fn().mockReturnValue(1625520000000); // Mock a fixed date (July 6, 2021 00:00:00 UTC)
    process.env.JWT_APP_SECRET = 'mockedSecret';
  });

  afterAll(() => {
    global.Date.now = originalDateNow;
  });

  describe('getToken', () => {
    test('should return a signed JWT token', async () => {
      const jwtInstance = new Jwt();
      jwtInstance.jwtSecret = 'secretEncoded';
      jwtInstance.getSignJWT = jest.fn(function () {
        return {
          setProtectedHeader: function ({ alg }) {
            expect(alg).toEqual('HS256');
            return this;
          },
          setAudience: function (context) {
            expect(context).toEqual('mockedContext');
            return this;
          },
          sign: function (jwtSecret) {
            expect(jwtSecret).toEqual('secretEncoded');
            return 'signToken';
          }
        }
      });
      const token = await jwtInstance.getToken('mockedContext');
      expect(jwtInstance.getSignJWT).toHaveBeenCalledTimes(1);
      expect(token).toEqual('signToken');
    });
  });


  describe('verifyToken', () => {
    test('should return a signed JWT token', async () => {
      const jwtInstance = new Jwt();
      jwtInstance.jwtSecret = 'secretEncoded';
      jwtInstance.getSignJWT = jest.fn(function () {
        return {
          setProtectedHeader: function ({ alg }) {
            expect(alg).toEqual('HS256');
            return this;
          },
          setAudience: function (context) {
            expect(context).toEqual('mockedContext');
            return this;
          },
          sign: function (jwtSecret) {
            expect(jwtSecret).toEqual('secretEncoded');
            return 'signToken';
          }
        }
      });
      const token = await jwtInstance.getToken('mockedContext');
      expect(jwtInstance.getSignJWT).toHaveBeenCalledTimes(1);
      expect(token).toEqual('signToken');
    });
  });
});

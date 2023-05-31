import AuthBusiness from "#src/domains/auth/businesses/AuthBusiness";

describe('AuthBusiness', () => {
  let authBusiness;

  beforeEach(() => {
    authBusiness = new AuthBusiness();
    authBusiness.jwt = {
      getToken: jest.fn(),
      getDateLocaleString: jest.fn()
    };
    authBusiness.token = jest.fn({
      'hashToken': {
        'name': 'test',
        'secret': '123'
      }
    });
  });

  describe('process', () => {
    test('should return null if context is not valid', async () => {
      authBusiness.getContextFromCredential = jest.fn(() => null);

      const params = {
        token: 'token',
        secret: 'secret'
      };
      const result = await authBusiness.process(params);

      expect(authBusiness.getContextFromCredential).toHaveBeenCalledTimes(1);
      expect(authBusiness.jwt.getToken).not.toHaveBeenCalled();
      expect(authBusiness.jwt.getDateLocaleString).not.toHaveBeenCalled();
      expect(authBusiness.token).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    test('should return token if context is valid', async () => {
      authBusiness.getContextFromCredential = jest.fn(() => 'test');
      authBusiness.jwt.getToken.mockImplementation(() => 'jwtToken');
      authBusiness.jwt.getDateLocaleString.mockImplementation(() => '30/05/2023, 21:53:15');

      const params = {
        token: 'hashToken',
        secret: '123'
      };

      const result = await authBusiness.process(params);
      expect(result).toEqual({ token: 'jwtToken', valid_until: '30/05/2023, 21:53:15' });
    });
  });

  describe('getContextFromCredential', () => {
    test('should return null if the token or secret are invalid', () => {
      const params = {
        token: 'token',
        secret: 'secret'
      };
      const result = authBusiness.getContextFromCredential(params);
      expect(result).toBeNull();
    });

    test('should return token if the token and secret are valid', () => {
      authBusiness.token = {
        'hashToken': {
          'name': 'test',
          'secret': '123'
        }
      };
      const params = {
        token: 'hashToken',
        secret: '123'
      };
      const result = authBusiness.getContextFromCredential(params);
      expect(result).toEqual('test');
    });
  });
});

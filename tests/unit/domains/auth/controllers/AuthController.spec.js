import AuthController from '#src/domains/auth/controllers/AuthController';

describe('AuthController', () => {
  let authController;

  beforeAll(() => {
    authController = new AuthController;
  });

  describe('process', () => {
    test('should return false if process fail', async () => {
      const authBusinessMock = {
        process: jest.fn(() => null)
      };

      const responseDataMock = {
        data: {},
        profiler: 0,
        token: 'myToken',
        requestId: '123',
      };

      const responseMock = {
        send: jest.fn(() => responseDataMock)
      };

      authController.authBusiness = authBusinessMock;
      authController.response = responseMock;

      const req = {
        body: {
          token: 'myToken',
          secret: 'mySecret'
        }
      };

      const send = jest.fn(() => {});
      const res = {
        status: jest.fn(() => { return { send }}),
        send: () => {}
      };

      const response = await authController.process(req, res);

      expect(authBusinessMock.process).toHaveBeenCalledTimes(1);
      expect(authBusinessMock.process).toHaveBeenCalledWith(req.body);
      expect(authBusinessMock.process).toHaveReturnedWith(null);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(401);

      expect(send).toHaveBeenCalledTimes(1);
      expect(send).toHaveBeenCalledWith(responseDataMock);

      expect(responseMock.send).toHaveBeenCalledTimes(1);
      expect(responseMock.send).toHaveBeenCalledWith(
        null,
        [],
        'Invalid credentials'
      );

      expect(response).toEqual(false);

    });

    test('should call res.send if process is not fail', async () => {
      const authResponse = {
        token: 'token',
        valid_until: 'valid'
      };

      const authBusinessMock = {
        process: jest.fn(() => authResponse)
      };

      const responseDataMock = {
        data: {},
        profiler: 0,
        token: 'myToken',
        requestId: '123',
      };

      const responseMock = {
        send: jest.fn(() => responseDataMock)
      };

      authController.authBusiness = authBusinessMock;
      authController.response = responseMock;

      const req = {
        body: {
          token: 'myToken',
          secret: 'mySecret'
        }
      };

      const send = jest.fn(() => {});
      const res = {
        status: jest.fn(() => { return { send }}),
        send: jest.fn(() => {})
      };

      const response = await authController.process(req, res);

      expect(authBusinessMock.process).toHaveBeenCalledTimes(1)
      expect(authBusinessMock.process).toHaveBeenCalledWith(req.body);
      expect(authBusinessMock.process).toHaveReturnedWith(authResponse);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith(responseDataMock);

      expect(responseMock.send).toHaveBeenCalledTimes(1);
      expect(responseMock.send).toHaveBeenCalledWith(authResponse.token, authResponse);
      expect(responseMock.send).toHaveReturnedWith(responseDataMock);

      expect(response).toBe(undefined);
    });
  })
});

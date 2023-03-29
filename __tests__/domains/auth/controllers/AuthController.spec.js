import AuthController from '#src/domains/auth/controllers/AuthController';

describe('Auth Controller Unit Tests', () => {
  test('instance of', () => {
    const authController = new AuthController();
    expect(authController).toBeInstanceOf(AuthController);
  });
});

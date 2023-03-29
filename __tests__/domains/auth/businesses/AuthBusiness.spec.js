import AuthBusiness from "#src/domains/auth/businesses/AuthBusiness";

describe('Auth Business Unit Tests', () => {
  test('instance of', () => {
    const authBusiness = new AuthBusiness();
    expect(authBusiness).toBeInstanceOf(AuthBusiness);
  });
});

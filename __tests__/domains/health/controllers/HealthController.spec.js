import HealthController from '#src/domains/health/controllers/HealthController';

describe('Health Controller Unit Tests', () => {
  test('instance of', () => {
    const healthController = new HealthController();
    expect(healthController).toBeInstanceOf(HealthController);
  });
});

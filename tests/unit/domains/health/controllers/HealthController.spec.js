import HealthController from '#src/domains/health/controllers/HealthController';
const VERSION = process.env.VERSION;

describe('HealthController', () => {
  beforeAll(() => {
    process.env = {
      VERSION: '1'
    };
  });

  afterAll(() => {
    process.env.VERSION = VERSION;
  });

  describe('process', () => {
    test('app is health', async () => {
      const req = {};
      const res = {
        send: jest.fn()
      }
      const healthController = new HealthController();
      const response = await healthController.process(req, res);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith({
        status: 'online',
        version: '1'
      });
      expect(response).toBe(undefined);
    })
  });
});

class HealthController {
  async process(_, res) {
    const healthJson = {
      status: 'online',
      version: process.env.VERSION,
    };

    res.send(healthJson);
  }
}

export default HealthController;

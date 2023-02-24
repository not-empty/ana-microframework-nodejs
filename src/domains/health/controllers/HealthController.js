class HealthController {
  async process(req, res) {
    const healthJson = {
      status: 'online',
      version: process.env.VERSION,
    };

    res.send(healthJson);
  }
}

module.exports = new HealthController();

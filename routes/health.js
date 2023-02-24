const express = require('express');
const router = express.Router();
const controllerFolder = '../src/domains/health/controllers/';

const HealthController = require(controllerFolder + 'HealthController');
router.get('/', (req, res) => {
  return HealthController.process(req, res);
});

router.get('/health', (req, res) => {
  return HealthController.process(req, res);
});

module.exports = router;

const express = require('express');

const router = express.Router();
const controllerFolder = '../src/domains/health/controllers/';

const HealthController = require(`${controllerFolder}HealthController`);
router.get('/', (req, res) => HealthController.process(req, res));

router.get('/health', (req, res) => HealthController.process(req, res));

module.exports = router;

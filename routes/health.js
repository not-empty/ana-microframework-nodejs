import { Router } from 'express';
import HealthController from '#src/domains/health/controllers/HealthController.js';

const healthRouter = Router();

healthRouter.get('/', (req, res) => {
  return HealthController.process(req, res);
});

healthRouter.get('/health', (req, res) => {
  return HealthController.process(req, res);
});

export { healthRouter };

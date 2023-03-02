import { Router } from 'express';
import AuthController from '#src/domains/auth/controllers/AuthController.js';

const authRouter = Router();

authRouter.post(
  '/',
  (req, res) => AuthController.process(req, res)
);

export { authRouter };

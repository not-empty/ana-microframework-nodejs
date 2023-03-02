import { Router } from 'express';
import AuthController from '#domains/auth/controllers/AuthController.js';

const authRouter = Router();

authRouter.post(
  '/',
  (req, res) => AuthController.process(req, res)
);

export { authRouter };

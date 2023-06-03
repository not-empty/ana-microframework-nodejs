import { Router } from 'express';
import { authRouter } from './auth.js';
import { healthRouter } from './health.js';

export const indexRoute = Router();

indexRoute.use('/auth', authRouter);
indexRoute.use('/', healthRouter);

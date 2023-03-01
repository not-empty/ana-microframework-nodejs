import { Router } from "express";
import { authRouter } from "./auth.js";
import { healthRouter } from "./health.js";
import { usersRouter } from "./users.js";

const indexRoute = Router();
indexRoute.use('/auth', authRouter)
indexRoute.use('/', healthRouter)
indexRoute.use('/users', usersRouter)

export { indexRoute };

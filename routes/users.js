import { Router } from 'express';
import JwtMiddleware from '#middlewares/JwtMiddleware.js';
import RequestParamsMiddleware from '#middlewares/RequestParamsMiddleware.js';
import {
  userAddValidator,
  userBulkValidator,
  userEditValidator,
} from '#domains/user/validators/index.js';
import { fields, order } from '#domains/user/parameters/UserParameter.js';
import {
  userListController,
  userDeadListController,
  userDetailController,
  userDeadDetailController,
  userDeleteController,
  userEditController,
  userBulkController,
  userAddController,
} from '#domains/user/controllers/index.js';

const usersRouter = Router();

usersRouter.use(JwtMiddleware.process);

usersRouter.use(RequestParamsMiddleware.process(fields, order));

usersRouter.get('/list', (req, res) => userListController.process(req, res));
usersRouter.get('/dead_list', (req, res) =>
  userDeadListController.process(req, res)
);
usersRouter.get('/detail/:id', (req, res) =>
  userDetailController.process(req, res)
);
usersRouter.get('/dead_detail/:id', (req, res) =>
  userDeadDetailController.process(req, res)
);
usersRouter.delete('/delete/:id', (req, res) =>
  userDeleteController.process(req, res)
);

usersRouter.post(
  '/add',
  userAddValidator.getValidations(),
  userAddValidator.checkRules,
  (req, res) => userAddController.process(req, res)
);

usersRouter.patch(
  '/edit/:id',
  userEditValidator.getValidations(),
  userEditValidator.checkRules,
  (req, res) => userEditController.process(req, res)
);

usersRouter.post(
  '/bulk',
  userBulkValidator.getValidations(),
  userBulkValidator.checkRules,
  (req, res) => userBulkController.process(req, res)
);

export { usersRouter };

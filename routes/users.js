import { Router } from 'express';
import JwtMiddleware from '#src/middlewares/JwtMiddleware.js';
import RequestParamsMiddleware from '#src/middlewares/RequestParamsMiddleware.js';
import {
  UserAddValidator,
  UserBulkValidator,
  UserEditValidator,
} from '#src/domains/user/validators/index.js';
import { fields, order } from '#src/domains/user/parameters/UserParameter.js';
import {
  UserListController,
  UserDeadListController,
  UserDetailController,
  UserDeadDetailController,
  UserDeleteController,
  UserEditController,
  UserBulkController,
  UserAddController,
} from '#src/domains/user/controllers/index.js';

const usersRouter = Router();

usersRouter.use(new JwtMiddleware().process);
usersRouter.use(new RequestParamsMiddleware().process(fields, order));

usersRouter.get('/list', (req, res) => new UserListController().process(req, res));
usersRouter.get('/dead_list', (req, res) => new UserDeadListController().process(req, res));
usersRouter.get('/detail/:id', (req, res) => new UserDetailController().process(req, res));
usersRouter.get('/dead_detail/:id', (req, res) => new UserDeadDetailController().process(req, res));
usersRouter.delete('/delete/:id', (req, res) => new UserDeleteController().process(req, res));

usersRouter.post(
  '/add',
  new UserAddValidator().getValidations(),
  new UserAddValidator().checkRules,
  (req, res) => new UserAddController().process(req, res)
);

usersRouter.patch(
  '/edit/:id',
  new UserEditValidator().getValidations(),
  new UserEditValidator().checkRules,
  (req, res) => new UserEditController().process(req, res)
);

usersRouter.post(
  '/bulk',
  new UserBulkValidator().getValidations(),
  new UserBulkValidator().checkRules,
  (req, res) => new UserBulkController().process(req, res)
);

export { usersRouter };

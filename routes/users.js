const express = require('express');
const JwtMiddleware = require('../src/middlewares/JwtMiddleware');
const RequestParamsMiddleware = require('../src/middlewares/RequestParamsMiddleware');
const userParameter = require('../src/domains/user/parameters/UserParameter');

const router = express.Router();
router.use(JwtMiddleware.process);
router.use(RequestParamsMiddleware.process(userParameter.fields, userParameter.order));

const controllerFolder = `${process.cwd()}/src/domains/user/controllers`;
const validatorFolder = `${process.cwd()}/src/domains/user/validators`;

const userListController = require(`${controllerFolder}/UserListController`);
const userDeadListController = require(`${controllerFolder}/UserDeadListController`);
const userDetailController = require(`${controllerFolder}/UserDetailController`);
const userDeadDetailController = require(`${controllerFolder}/UserDeadDetailController`);
const userAddController = require(`${controllerFolder}/UserAddController`);
const userBulkController = require(`${controllerFolder}/UserBulkController`);
const userDeleteController = require(`${controllerFolder}/UserDeleteController`);
const userEditController = require(`${controllerFolder}/UserEditController`);

const userAddValidator = require(`${validatorFolder}/UserAddValidator`);
const userBulkValidator = require(`${validatorFolder}/UserBulkValidator`);
const userEditValidator = require(`${validatorFolder}/UserEditValidator`);

router.get('/list', (req, res) => userListController.process(req, res));
router.get('/dead_list', (req, res) => userDeadListController.process(req, res));
router.get('/detail/:id', (req, res) => userDetailController.process(req, res));
router.get('/dead_detail/:id', (req, res) => userDeadDetailController.process(req, res));
router.delete('/delete/:id', (req, res) => userDeleteController.process(req, res));

router.post(
  '/add',
  userAddValidator.getValidations(),
  userAddValidator.checkRules,
  (req, res) => userAddController.process(req, res)
);

router.patch(
  '/edit/:id',
  userEditValidator.getValidations(),
  userEditValidator.checkRules,
  (req, res) => userEditController.process(req, res)
);

router.post(
  '/bulk',
  userBulkValidator.getValidations(),
  userBulkValidator.checkRules,
  (req, res) => userBulkController.process(req, res)
);

module.exports = router;

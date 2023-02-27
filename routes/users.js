const express = require('express');

const controller = require('../src/domains/user/controllers/index');
const JwtMiddleware = require('../src/middlewares/JwtMiddleware');
const RequestParamsMiddleware = require('../src/middlewares/RequestParamsMiddleware');
const userParameter = require('../src/domains/user/parameters/UserParameter');
const validator = require('../src/domains/user/validators/index');

const router = express.Router();

router.use(JwtMiddleware.process);
router.use(RequestParamsMiddleware.process(userParameter.fields, userParameter.order));

router.get('/list', (req, res) => controller.userListController.process(req, res));
router.get('/dead_list', (req, res) => controller.userDeadListController.process(req, res));
router.get('/detail/:id', (req, res) => controller.userDetailController.process(req, res));
router.get('/dead_detail/:id', (req, res) => controller.userDeadDetailController.process(req, res));
router.delete('/delete/:id', (req, res) => controller.userDeleteController.process(req, res));

router.post(
  '/add',
  validator.userAddValidator.getValidations(),
  validator.userAddValidator.checkRules,
  (req, res) => controller.userAddController.process(req, res)
);

router.patch(
  '/edit/:id',
  validator.userEditValidator.getValidations(),
  validator.userEditValidator.checkRules,
  (req, res) => controller.userEditController.process(req, res)
);

router.post(
  '/bulk',
  validator.userBulkValidator.getValidations(),
  validator.userBulkValidator.checkRules,
  (req, res) => controller.userBulkController.process(req, res)
);

module.exports = router;

const express = require('express');

const indexController = require('../src/domains/user/controllers/index');
const indexValidator = require('../src/domains/user/validators/index');
const JwtMiddleware = require('../src/middlewares/JwtMiddleware');
const RequestParamsMiddleware = require('../src/middlewares/RequestParamsMiddleware');
const userParameter = require('../src/domains/user/parameters/UserParameter');

const router = express.Router();

router.use(JwtMiddleware.process);
router.use(RequestParamsMiddleware.process(userParameter.fields, userParameter.order));

router.get('/list', (req, res) => indexController.userListController.process(req, res));
router.get('/dead_list', (req, res) => indexController.userDeadListController.process(req, res));
router.get('/detail/:id', (req, res) => indexController.userDetailController.process(req, res));
router.get('/dead_detail/:id', (req, res) => indexController.userDeadDetailController.process(req, res));
router.delete('/delete/:id', (req, res) => indexController.userDeleteController.process(req, res));

router.post(
  '/add',
  indexValidator.userAddValidator.getValidations(),
  indexValidator.userAddValidator.checkRules,
  (req, res) => indexController.userAddController.process(req, res)
);

router.patch(
  '/edit/:id',
  indexValidator.userEditValidator.getValidations(),
  indexValidator.userEditValidator.checkRules,
  (req, res) => indexController.userEditController.process(req, res)
);

router.post(
  '/bulk',
  indexValidator.userBulkValidator.getValidations(),
  indexValidator.userBulkValidator.checkRules,
  (req, res) => indexController.userBulkController.process(req, res)
);

module.exports = router;

const express = require('express');

const router = express.Router();
const controllerFolder = '../src/domains/auth/controllers/';

const AuthController = require(`${controllerFolder}AuthController`);
router.post(
  '/',
  (req, res) => AuthController.process(req, res)
);

module.exports = router;

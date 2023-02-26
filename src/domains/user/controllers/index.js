const controllerFolder = `${process.cwd()}/src/domains/user/controllers`;

const userListController = require(`${controllerFolder}/UserListController`);
const userDeadListController = require(`${controllerFolder}/UserDeadListController`);
const userDetailController = require(`${controllerFolder}/UserDetailController`);
const userDeadDetailController = require(`${controllerFolder}/UserDeadDetailController`);
const userAddController = require(`${controllerFolder}/UserAddController`);
const userBulkController = require(`${controllerFolder}/UserBulkController`);
const userDeleteController = require(`${controllerFolder}/UserDeleteController`);
const userEditController = require(`${controllerFolder}/UserEditController`);

module.exports = {
  userListController,
  userDeadListController,
  userDetailController,
  userDeadDetailController,
  userAddController,
  userBulkController,
  userDeleteController,
  userEditController,
};

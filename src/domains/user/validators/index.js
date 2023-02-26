const validatorFolder = `${process.cwd()}/src/domains/user/validators`;

const userAddValidator = require(`${validatorFolder}/UserAddValidator`);
const userBulkValidator = require(`${validatorFolder}/UserBulkValidator`);
const userEditValidator = require(`${validatorFolder}/UserEditValidator`);

module.exports = {
  userAddValidator,
  userBulkValidator,
  userEditValidator ,
};

const UserBulkRepository = require('../repositories/UserBulkRepository');

class UserBulkBusiness {
  constructor() {
    this.userBulkRepository = UserBulkRepository;
  }

  process(body) {
    const { ids } = body;
    return this.userBulkRepository.bulk(ids);
  }
}

module.exports = new UserBulkBusiness();

const BaseRepository = require('../../../repositories/BaseRepository');

class UserBulkRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

module.exports = new UserBulkRepository();

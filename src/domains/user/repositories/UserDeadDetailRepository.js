const BaseRepository = require('../../../repositories/BaseRepository');

class UserDeadDetailRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

module.exports = new UserDeadDetailRepository();

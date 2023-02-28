const BaseRepository = require('../../../repositories/BaseRepository');

class UserDeleteRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}

module.exports = new UserDeleteRepository();

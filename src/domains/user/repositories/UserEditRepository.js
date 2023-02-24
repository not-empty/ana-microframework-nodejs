const BaseRepository = require('../../../repositories/BaseRepository');

class UserEditRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}
  
module.exports = new UserEditRepository();

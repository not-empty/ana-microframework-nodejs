const BaseRepository = require('../../../repositories/BaseRepository');

class UserListRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}
  
module.exports = new UserListRepository();

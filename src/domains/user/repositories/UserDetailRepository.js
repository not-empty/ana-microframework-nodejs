const BaseRepository = require('../../../repositories/BaseRepository');

class UserDetailRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}
  
module.exports = new UserDetailRepository();

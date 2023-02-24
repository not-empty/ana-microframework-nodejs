const BaseRepository = require('../../../repositories/BaseRepository');

class UserDeadListRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}
  
module.exports = new UserDeadListRepository();

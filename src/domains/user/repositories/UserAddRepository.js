const BaseRepository = require('../../../repositories/BaseRepository');

class UserAddRepository extends BaseRepository {
  constructor() {
    super('user');
  }
}
  
module.exports = new UserAddRepository();

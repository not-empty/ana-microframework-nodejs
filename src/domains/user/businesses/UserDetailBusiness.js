const UserDetailRepository = require('../repositories/UserDetailRepository');

class UserDetailBusiness {
  constructor() {
    this.userDetailRepository = UserDetailRepository;
  }

  process(id) {
    const result = this.userDetailRepository.getById(id);
    return result;
  }
}

module.exports = new UserDetailBusiness();

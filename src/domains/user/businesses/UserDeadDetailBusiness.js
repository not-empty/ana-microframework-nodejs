const UserDeadDetailRepository = require('../repositories/UserDeadDetailRepository');

class UserDeadDetailBusiness {
  constructor() {
    this.userDeadDetailRepository = UserDeadDetailRepository;
  }

  process(id) {
    const result = this.userDeadDetailRepository.getDeadById(id);
    return result;
  }
}

module.exports = new UserDeadDetailBusiness();

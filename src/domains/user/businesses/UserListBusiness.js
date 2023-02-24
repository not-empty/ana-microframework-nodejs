const UserListRepository = require('../repositories/UserListRepository');

class UserDetailBusiness {
  constructor() {
    this.userListRepository = UserListRepository;
  }

  process(query) {
    const result = this.userListRepository.get(query.fields, query.page, query.order, query.class);
    return result;
  }
}

module.exports = new UserDetailBusiness();

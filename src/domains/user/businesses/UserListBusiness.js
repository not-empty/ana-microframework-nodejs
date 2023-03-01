import UserListRepository from '../repositories/UserListRepository.js';

class UserDetailBusiness {
  constructor() {
    this.userListRepository = UserListRepository;
  }

  process(query) {
    const result = this.userListRepository.get(query.fields, query.page, query.order, query.class);
    return result;
  }
}

export default new UserDetailBusiness;

import UserListRepository from '../repositories/UserListRepository.js';

class UserDetailBusiness {
  constructor() {
    this.userListRepository = new UserListRepository();
  }

  process(query) {
    const result = this.userListRepository.get(
      query.fields,
      query.page,
      query.order,
      query.class
    );
    return result;
  }
}

export default UserDetailBusiness;

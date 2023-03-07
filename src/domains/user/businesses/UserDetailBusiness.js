import UserDetailRepository from '../repositories/UserDetailRepository.js';
class UserDetailBusiness {
  constructor() {
    this.userDetailRepository = new UserDetailRepository();
  }

  process(id) {
    const result = this.userDetailRepository.getById(id);
    return result;
  }
}

export default UserDetailBusiness;

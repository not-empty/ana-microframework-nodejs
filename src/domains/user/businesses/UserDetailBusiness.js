import UserDetailRepository from '../repositories/UserDetailRepository.js';
class UserDetailBusiness {
  constructor() {
    this.userDetailRepository = UserDetailRepository;
  }

  process(id) {
    const result = this.userDetailRepository.getById(id);
    return result;
  }
}

export default new UserDetailBusiness;

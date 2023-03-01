import UserDeadDetailRepository from '../repositories/UserDeadDetailRepository.js';
class UserDeadDetailBusiness {
  constructor() {
    this.userDeadDetailRepository = UserDeadDetailRepository;
  }

  process(id) {
    const result = this.userDeadDetailRepository.getDeadById(id);
    return result;
  }
}

export default new UserDeadDetailBusiness;

import UserDeleteRepository from '../repositories/UserDeleteRepository.js';

class UserDeleteBusiness {
  constructor() {
    this.userDeleteRepository = new UserDeleteRepository();
  }

  async process(id) {
    const result = await this.userDeleteRepository.getById(id);
    if (!Object.keys(result).length) {
      return false;
    }

    this.userDeleteRepository.delete(id);
    return true;
  }
}

export default UserDeleteBusiness;

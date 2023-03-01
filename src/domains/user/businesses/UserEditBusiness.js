import UserEditRepository from '../repositories/UserEditRepository.js';

class UserEditBusiness {
  constructor() {
    this.userEditRepository = UserEditRepository;
  }

  async process(id, params) {
    const result = await this.userEditRepository.getById(id);
    if (!Object.keys(result).length) {
      return false;
    }

    await this.userEditRepository.update(id, params);
    return await this.userEditRepository.getById(id);;
  }
}

export default new UserEditBusiness;

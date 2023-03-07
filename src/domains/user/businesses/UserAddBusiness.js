import UserAddRepository from '../repositories/UserAddRepository.js';

class UserAddBusiness {
  constructor() {
    this.userAddRepository = new UserAddRepository();
  }

  async process(body) {
    const result = await this.userAddRepository.insert(body);
    return this.userAddRepository.getById(result);
  }
}

export default UserAddBusiness;

const UserAddRepository = require('../repositories/UserAddRepository');

class UserAddBusiness {
  constructor() {
    this.userAddRepository = UserAddRepository;
  }

  async process(body) {
    const result = await this.userAddRepository.insert(body);
    return this.userAddRepository.getById(result);
  }
}

module.exports = new UserAddBusiness();

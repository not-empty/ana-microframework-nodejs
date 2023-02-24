const UserDeleteRepository = require('../repositories/UserDeleteRepository');

class UserDeleteBusiness {
  constructor() {
    this.userDeleteRepository = UserDeleteRepository;
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

module.exports = new UserDeleteBusiness();

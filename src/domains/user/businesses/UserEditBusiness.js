const UserEditRepository = require('../repositories/UserEditRepository');

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
    return await this.userEditRepository.getById(id);
  }
}

module.exports = new UserEditBusiness();

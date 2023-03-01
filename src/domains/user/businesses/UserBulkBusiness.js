import UserBulkRepository from '../repositories/UserBulkRepository.js';
class UserBulkBusiness {
  constructor() {
    this.userBulkRepository = UserBulkRepository;
  }

  process(body) {
    const ids = body.ids;
    return this.userBulkRepository.bulk(ids);
  }
}

export default new UserBulkBusiness;

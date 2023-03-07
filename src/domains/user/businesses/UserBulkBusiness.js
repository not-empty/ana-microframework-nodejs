import UserBulkRepository from '../repositories/UserBulkRepository.js';
class UserBulkBusiness {
  constructor() {
    this.userBulkRepository = new UserBulkRepository();
  }

  process(body) {
    const { ids } = body;
    return this.userBulkRepository.bulk(ids);
  }
}

export default UserBulkBusiness;

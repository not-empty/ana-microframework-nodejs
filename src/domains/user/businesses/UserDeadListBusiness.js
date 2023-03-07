import UserDeadListRepository from '../repositories/UserDeadListRepository.js';

class UserDeadListBusiness {
  constructor() {
    this.userDeadListRepository = new UserDeadListRepository();
  }

  process(query) {
    const result = this.userDeadListRepository.getDead(
      query.fields,
      query.page,
      query.order,
      query.class
    );
    return result;
  }
}

export default UserDeadListBusiness;

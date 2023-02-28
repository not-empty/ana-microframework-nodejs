const UserDeadListRepository = require('../repositories/UserDeadListRepository');

class UserDeadListBusiness {
  constructor() {
    this.userDeadListRepository = UserDeadListRepository;
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

module.exports = new UserDeadListBusiness();

// eslint-disable-next-line max-len
import $__domain__$DeadListRepository from '../repositories/$__domain__$DeadListRepository.js';

class $__domain__$DeadListBusiness {
  constructor() {
    this.$__domain_low__$DeadListRepository = new $__domain__$DeadListRepository();
  }

  process(query) {
    const result = this.$__domain_low__$DeadListRepository.getDead(
      query.fields,
      query.page,
      query.order,
      query.class
    );
    return result;
  }
}

export default $__domain__$DeadListBusiness;

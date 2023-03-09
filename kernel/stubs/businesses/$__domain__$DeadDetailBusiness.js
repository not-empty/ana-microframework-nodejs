// eslint-disable-next-line max-len
import $__domain__$DeadDetailRepository from '../repositories/$__domain__$DeadDetailRepository.js';

class $__domain__$DeadDetailBusiness {
  constructor() {
    this.$__domain_low__$DeadDetailRepository = new $__domain__$DeadDetailRepository();
  }

  process(id) {
    const result = this.$__domain_low__$DeadDetailRepository.getDeadById(id);
    return result;
  }
}

export default $__domain__$DeadDetailBusiness;

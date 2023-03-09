// eslint-disable-next-line max-len
import $__domain__$DetailRepository from '../repositories/$__domain__$DetailRepository.js';

class $__domain__$DetailBusiness {
  constructor() {
    this.$__domain_low__$DetailRepository = new $__domain__$DetailRepository();
  }

  process(id) {
    const result = this.$__domain_low__$DetailRepository.getById(id);
    return result;
  }
}

export default $__domain__$DetailBusiness;

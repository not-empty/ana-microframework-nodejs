// eslint-disable-next-line max-len
import $__domain__$AddRepository from '../repositories/$__domain__$AddRepository.js';

class $__domain__$AddBusiness {
  constructor() {
    this.$__domain_low__$AddRepository = new $__domain__$AddRepository();
  }

  async process(body) {
    const result = await this.$__domain_low__$AddRepository.insert(body);
    return this.$__domain_low__$AddRepository.getById(result);
  }
}

export default $__domain__$AddBusiness;

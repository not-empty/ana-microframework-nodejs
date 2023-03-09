// eslint-disable-next-line max-len
import $__domain__$DeleteRepository from '../repositories/$__domain__$DeleteRepository.js';

class $__domain__$DeleteBusiness {
  constructor() {
    this.$__domain_low__$DeleteRepository = new $__domain__$DeleteRepository();
  }

  async process(id) {
    const result = await this.$__domain_low__$DeleteRepository.getById(id);
    if (!Object.keys(result).length) {
      return false;
    }

    this.$__domain_low__$DeleteRepository.delete(id);
    return true;
  }
}

export default $__domain__$DeleteBusiness;

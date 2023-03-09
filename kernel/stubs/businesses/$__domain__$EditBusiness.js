// eslint-disable-next-line max-len
import $__domain__$EditRepository from '../repositories/$__domain__$EditRepository.js';

class $__domain__$EditBusiness {
  constructor() {
    this.$__domain_low__$EditRepository = new $__domain__$EditRepository();
  }

  async process(id, params) {
    const result = await this.$__domain_low__$EditRepository.getById(id);
    if (!Object.keys(result).length) {
      return false;
    }

    await this.$__domain_low__$EditRepository.update(id, params);
    return await this.$__domain_low__$EditRepository.getById(id);
  }
}

export default $__domain__$EditBusiness;

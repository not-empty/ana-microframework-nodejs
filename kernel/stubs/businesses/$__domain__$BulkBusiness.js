// eslint-disable-next-line max-len
import $__domain__$BulkRepository from '../repositories/$__domain__$BulkRepository.js';

class $__domain__$BulkBusiness {
  constructor() {
    this.$__domain_low__$BulkRepository = new $__domain__$BulkRepository();
  }

  process(body) {
    const { ids } = body;
    return this.$__domain_low__$BulkRepository.bulk(ids);
  }
}

export default $__domain__$BulkBusiness;

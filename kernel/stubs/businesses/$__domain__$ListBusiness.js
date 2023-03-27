// eslint-disable-next-line max-len
import $__domain__$ListRepository from '../repositories/$__domain__$ListRepository.js';

class $__domain__$DetailBusiness {
  constructor() {
    this.$__domain_low__$ListRepository = new $__domain__$ListRepository();
  }

  process(query) {
    const result = this.$__domain_low__$ListRepository.get(
      query.fields,
      query.page,
      query.order,
      query.class,
      query.filters
    );
    return result;
  }
}

export default $__domain__$DetailBusiness;

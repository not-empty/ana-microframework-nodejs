class Filter {
  constructor(config, filtersData) {
    this.config = config;
    this.filtersData = filtersData;
  }

  getValidFilters() {
    const filtersValue = new Map();
    for (const [key, value] of this.filtersData) {
      const config = this.config[key];

      if (
        config == undefined ||
        config == null
      ) {
        continue;
      }

      if (!Object.keys(config).length) {
        continue;
      }

      const condition = value.split(',');
      for (const permission of config.permissions) {
        if (permission == condition[0]) {
          filtersValue.set(key, {type: permission, data: condition[1]});
        }
      }
    }

    return filtersValue;
  }
}

export default Filter;

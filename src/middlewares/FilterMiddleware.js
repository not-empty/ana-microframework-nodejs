import Filter from '#src/core/filter.js';

class FilterMiddleware {
  process(filterConfig) {
    return function (req, res, next) {
      const RequestData = req.query || [];

      const filtersValue = new Map();
      for (let data in RequestData) {
        data = data.toLowerCase();
        if (data.search('filter_') !== -1) {
          filtersValue.set(data.replace('filter_', ''), RequestData[data]);
        }
      }

      const filter = new Filter(filterConfig, filtersValue);
      res.locals.filters = filter.getValidFilters();
      next();
    }
  }
}

export default FilterMiddleware;

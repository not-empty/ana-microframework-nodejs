import { filters } from '#src/config/filterType.js';

export const filter = {
  field: {
    permissions: [
      filters.FILTER_EQUAL,
      filters.FILTER_NOT_EQUAL,
      filters.FILTER_LIKE,
    ]
  },
  created: {
    permissions: [
      filters.FILTER_LESS_THAN,
      filters.FILTER_GREATER_THAN,
      filters.FILTER_GREATER_THAN_OR_EQUAL,
      filters.FILTER_LESS_THAN_OR_EQUAL,
    ]
  },
  modified: {
    permissions: [
      filters.FILTER_LESS_THAN,
      filters.FILTER_GREATER_THAN,
      filters.FILTER_GREATER_THAN_OR_EQUAL,
      filters.FILTER_LESS_THAN_OR_EQUAL,
    ]
  },
};

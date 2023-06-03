import FilterMiddleware from '#src/middlewares/FilterMiddleware';

const mockGetValidFilters = jest.fn().mockImplementation(() => { });
const mockFilterReceivedArgs = jest.fn().mockImplementation(() => { });

jest.mock('#src/core/filter.js', (config, values) => {
  return jest.fn().mockImplementation((...args) => {
    mockFilterReceivedArgs(...args);
    return {
      getValidFilters: mockGetValidFilters
    }
  });
});

describe('FilterMiddleware', () => {
  let req;
  let res;
  let next;
  let filterConfig;

  beforeEach(() => {
    req = {
      query: {
        filter_name: 'eql,Test',
        filter_email: 'eql,email@emal.com'
      }
    };

    res = {
      locals: {
        filters: {}
      }
    };

    next = jest.fn(() => {});

    filterConfig = {
      filter1: {
        permissions: ['eql', 'gt'],
      },
      filter2: {
        permissions: ['eql'],
      },
    };
  });

  describe('process', () => {
    test('should return valid filters', () => {
      const filterMiddleware = new FilterMiddleware();
      const process = filterMiddleware.process(filterConfig);
      process(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(mockGetValidFilters).toHaveBeenCalledTimes(1);
      expect(mockFilterReceivedArgs).toHaveBeenCalledWith(
        filterConfig,
        new Map([
          ['name', 'eql,Test'],
          ['email', 'eql,email@emal.com']
        ])
      );
    });

    test('should return empty map when query filters is empty', () => {
      const filterMiddleware = new FilterMiddleware();
      const process = filterMiddleware.process(filterConfig);
      process({}, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(mockGetValidFilters).toHaveBeenCalledTimes(1);
      expect(mockFilterReceivedArgs).toHaveBeenCalledWith(
        filterConfig,
        new Map()
      );
    });

    test('should return empty map when query params not contains filter_ prefix', () => {
      const filterMiddleware = new FilterMiddleware();
      const process = filterMiddleware.process(filterConfig);
      req.query = {
        name: 'Teste',
        email: 'email@email.com'
      };
      process(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(mockGetValidFilters).toHaveBeenCalledTimes(1);
      expect(mockFilterReceivedArgs).toHaveBeenCalledWith(
        filterConfig,
        new Map()
      );
    });
  });
});

import Filter from '#src/core/filter.js';

describe('Filter', () => {
  describe('getValidFilters', () => {
    test('should return an empty map if filtersData is empty', () => {
      const config = {
        filter1: {
          permissions: ['permission1', 'permission2'],
        },
        filter2: {
          permissions: ['permission3'],
        },
      };
      const filtersData = new Map();
      const filter = new Filter(config, filtersData);

      const result = filter.getValidFilters();
      expect(result.size).toBe(0);
    });

    test('should return valid filters based on config and filtersData', () => {
      const config = {
        filter1: {
          permissions: ['permission1', 'permission2'],
        },
        filter2: {
          permissions: ['permission3'],
        },
        filter3: {
          permissions: []
        }
      };
      const filtersData = new Map([
        ['filter1', 'permission1,value1'],
        ['filter2', 'permission3,value2'],
      ]);
      const filter = new Filter(config, filtersData);

      const result = filter.getValidFilters();

      expect(result.size).toBe(2);
      expect(result.get('filter1')).toEqual({
        type: 'permission1',
        data: 'value1',
      });
      expect(result.get('filter2')).toEqual({
        type: 'permission3',
        data: 'value2',
      });
    });

    test('should skip filters without config or empty config', () => {
      const config = {
        filter1: {
          permissions: ['permission1', 'permission2'],
        },
        filter2: {
          permissions: ['permission3'],
        },
        filter4: {}
      };
      const filtersData = new Map([
        ['filter1', 'permission1,value1'],
        ['filter2', 'permission3,value2'],
        ['filter3', 'permission4,value3'],
        ['filter4', 'permission4,value3'],
      ]);
      const filter = new Filter(config, filtersData);

      const result = filter.getValidFilters();

      expect(result.size).toBe(2);
      expect(result.get('filter1')).toEqual({
        type: 'permission1',
        data: 'value1',
      });

      expect(result.get('filter2')).toEqual({
        type: 'permission3',
        data: 'value2',
      });
    });
  });
});

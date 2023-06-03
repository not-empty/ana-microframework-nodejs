import Filter from '#src/core/filter.js';

describe('Filter', () => {
  describe('getValidFilters', () => {
    test('should return an empty map if filtersData is empty', () => {
      const config = {
        filter1: {
          permissions: ['eql', 'gt'],
        },
        filter2: {
          permissions: ['eql'],
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
          permissions: ['eql', 'gt'],
        },
        filter2: {
          permissions: ['eql'],
        },
        filter3: {
          permissions: []
        }
      };
      const filtersData = new Map([
        ['filter1', 'eql,value1'],
        ['filter2', 'eql,value2'],
      ]);
      const filter = new Filter(config, filtersData);

      const result = filter.getValidFilters();

      expect(result.size).toBe(2);
      expect(result.get('filter1')).toEqual({
        type: 'eql',
        data: 'value1',
      });
      expect(result.get('filter2')).toEqual({
        type: 'eql',
        data: 'value2',
      });
    });

    test('should skip filters without config or empty config', () => {
      const config = {
        filter1: {
          permissions: ['eql', 'gt'],
        },
        filter2: {
          permissions: ['gt'],
        },
        filter4: {}
      };
      const filtersData = new Map([
        ['filter1', 'eql,value1'],
        ['filter2', 'gt,value2'],
        ['filter3', 'eql,value3'],
        ['filter4', 'eql,value3'],
      ]);
      const filter = new Filter(config, filtersData);

      const result = filter.getValidFilters();

      expect(result.size).toBe(2);
      expect(result.get('filter1')).toEqual({
        type: 'eql',
        data: 'value1',
      });

      expect(result.get('filter2')).toEqual({
        type: 'gt',
        data: 'value2',
      });
    });
  });
});

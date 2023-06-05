import { BaseRepository } from '#src/repositories/BaseRepository.js';
import { ulid } from 'ulid';
import { createConnection } from 'mysql';

jest.mock('mysql', () => ({
  createConnection: jest.fn(() => ({
    state: 'mocked',
    connect: jest.fn((callback) => callback()),
    query: jest.fn((query, params, callback) => callback(null, {})),
  })),
}));

jest.mock('ulid', () => ({
  ulid: jest.fn(),
}));

describe('BaseRepository', () => {
  let baseRepository;

  beforeEach(() => {
    baseRepository = new BaseRepository('table_name');
  });

  describe('constructor', () => {
    test('should create a connection with the correct configuration', () => {
      expect(baseRepository.connection).toBeDefined();
      expect(baseRepository.connection.state).toBe('mocked');
      expect(createConnection).toHaveBeenCalledTimes(1);
    });

    test('should set the default value for maxAmountRows', () => {
      expect(baseRepository.maxAmountRows).toBe(25);
    });
  });

  describe('getById', () => {
    test('should execute the single query with the correct SQL', async () => {
      jest.spyOn(baseRepository, 'execSingleQuery');
      const id = '123';
      await baseRepository.getById(id);

      const [query, values] = baseRepository.execSingleQuery.mock.calls[0];
      expect(query).toContain('*');
      expect(query).toContain('table_name');
      expect(query).toContain('id = ?');
      expect(query).toContain('deleted IS NULL');
      expect(values).toEqual([id]);
    });
  });

  describe('getDeadById', () => {
    test('should execute the single query with the correct SQL', async () => {
      jest.spyOn(baseRepository, 'execSingleQuery');
      const id = '123';

      await baseRepository.getDeadById(id);

      const [query, values] = baseRepository.execSingleQuery.mock.calls[0];
      expect(query).toContain('*');
      expect(query).toContain('table_name');
      expect(query).toContain('id = ?');
      expect(query).toContain('deleted IS NOT NULL');
      expect(values).toEqual([id]);
    });
  });

  describe('get', () => {
    test('should use default args values', async () => {
      jest.spyOn(baseRepository, 'execQuery');
      const applyFiltersMock = jest.spyOn(baseRepository, 'applyFilters');
      applyFiltersMock.mockImplementation(() => ({
        conditions: '',
        values: []
      }));

      await baseRepository.get();

      const [query, values] = baseRepository.execQuery.mock.calls[0];
      expect(query).toContain('*');
      expect(query).toContain('table_name');
      expect(query).toContain('deleted IS NULL');
      expect(query).toContain('ORDER BY id asc');
      expect(query).toContain('LIMIT 25 OFFSET 0');
      expect(values).toEqual([]);
    });

    test('should use args values', async () => {
      jest.spyOn(baseRepository, 'execQuery');
      const applyFiltersMock = jest.spyOn(baseRepository, 'applyFilters');
      applyFiltersMock.mockImplementation(() => ({
        conditions: 'id = ? AND name like ?',
        values: [ 1, '%test%']
      }));

      await baseRepository.get(
        'id, name',
        2,
        'name',
        'desc',
        {
          id: {
            type: 'eql',
            data: 1,
          },
          name: {
            type: 'lik',
            data: 'test',
          },
        }
      );

      const [query, values] = baseRepository.execQuery.mock.calls[0];
      expect(query).toContain('id, name');
      expect(query).toContain('table_name');
      expect(query).toContain('deleted IS NULL');
      expect(query).toContain('id = ?');
      expect(query).toContain('name like ?');
      expect(query).toContain('ORDER BY name desc');
      expect(query).toContain('LIMIT 25 OFFSET 25');
      expect(values).toEqual([ 1, '%test%']);
    });
  });

  describe('getDead', () => {
    test('should use default args values', async () => {
      jest.spyOn(baseRepository, 'execQuery');
      const applyFiltersMock = jest.spyOn(baseRepository, 'applyFilters');
      applyFiltersMock.mockImplementation(() => ({
        conditions: '',
        values: []
      }));

      await baseRepository.getDead();

      const [query, values] = baseRepository.execQuery.mock.calls[0];
      expect(query).toContain('*');
      expect(query).toContain('table_name');
      expect(query).toContain('deleted IS NOT NULL');
      expect(query).toContain('ORDER BY id asc');
      expect(query).toContain('LIMIT 25 OFFSET 0');
      expect(values).toEqual([]);
    });

    test('should use args values', async () => {
      jest.spyOn(baseRepository, 'execQuery');
      const applyFiltersMock = jest.spyOn(baseRepository, 'applyFilters');
      applyFiltersMock.mockImplementation(() => ({
        conditions: 'id = ? AND name like ?',
        values: [ 1, '%test%']
      }));

      await baseRepository.getDead(
        'id, name',
        2,
        'name',
        'desc',
        {
          id: {
            type: 'eql',
            data: 1,
          },
          name: {
            type: 'lik',
            data: 'test',
          },
        }
      );

      const [query, values] = baseRepository.execQuery.mock.calls[0];
      expect(query).toContain('id, name');
      expect(query).toContain('table_name');
      expect(query).toContain('deleted IS NOT NULL');
      expect(query).toContain('id = ?');
      expect(query).toContain('name like ?');
      expect(query).toContain('ORDER BY name desc');
      expect(query).toContain('LIMIT 25 OFFSET 25');
      expect(values).toEqual([ 1, '%test%']);
    });
  });

  describe('bulk', () => {
    test('should return valid query', async () => {
      jest.spyOn(baseRepository, 'execQuery');
      const ids = [ 1, 12, 50 ];
      await baseRepository.bulk(ids);

      const [query, values] = baseRepository.execQuery.mock.calls[0];
      expect(query).toContain('*');
      expect(query).toContain('table_name');
      expect(query).toContain('?,?,?');
      expect(query).toContain('deleted IS NULL');
      expect(values).toEqual(ids);
    });

    test('should return query without ids', async () => {
      jest.spyOn(baseRepository, 'execQuery');
      const ids = [];
      await baseRepository.bulk(ids);

      const [query, values] = baseRepository.execQuery.mock.calls[0];
      expect(query).toContain('*');
      expect(query).toContain('table_name');
      expect(query).not.toContain('?');
      expect(query).toContain('deleted IS NULL');
      expect(values).toEqual(ids);
    });
  });

  describe('delete', () => {
    test('should delete', async () => {
      jest.spyOn(baseRepository, 'execQuery');
      const id = 1;
      await baseRepository.delete(id);

      const [query, values] = baseRepository.execQuery.mock.calls[0];
      expect(query).toContain('table_name');
      expect(query).toContain('id = ?');
      expect(query).toContain('deleted = CURRENT_TIMESTAMP()');
      expect(values).toEqual([id]);
    });
  });

  describe('update', () => {
    test('should update', async () => {
      jest.spyOn(baseRepository, 'execQuery');
      const id = 1;
      const params = {
        id,
        name: 'New Name',
        email: 'new@emal.com'
      };
      const result = await baseRepository.update(id, params);

      const [query, values] = baseRepository.execQuery.mock.calls[0];
      expect(query).toContain('table_name');
      expect(query).toContain('WHERE id = ?');
      expect(values).toEqual([params, id]);
      expect(result).toEqual(id);
    });
  });

  describe('insert', () => {
    test('should insert with new ulid when id is undefined', async () => {
      ulid.mockImplementation(() => 'newUlid');
      jest.spyOn(baseRepository, 'execQuery');
      const params = {
        name: 'New Name',
        email: 'new@emal.com'
      };
      const result = await baseRepository.insert(params);

      const [query, values] = baseRepository.execQuery.mock.calls[0];
      expect(result).toEqual('newUlid');
      expect(query).toContain('INSERT INTO table_name');
      expect(query).toContain('name,email,id');
      expect(values).toEqual([[Object.values(params)]]);
    });

    test('should insert with id when id is not undefined', async () => {
      ulid.mockImplementation(() => 'newUlid');
      jest.spyOn(baseRepository, 'execQuery');
      const params = {
        id: 1,
        name: 'New Name',
        email: 'new@emal.com',
        age: 80,
      };
      const result = await baseRepository.insert(params);

      const [query, values] = baseRepository.execQuery.mock.calls[0];
      expect(result).toEqual(1);
      expect(query).toContain('INSERT INTO table_name');
      expect(query).toContain('id,name,email,age');
      expect(values).toEqual([[Object.values(params)]]);
    });
  });
});

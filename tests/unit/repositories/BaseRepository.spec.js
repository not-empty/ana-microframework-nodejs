import { BaseRepository } from '#src/repositories/BaseRepository.js';
import { ulid } from 'ulid';
import { createConnection } from 'mysql';

jest.mock('mysql', () => ({
  createConnection: jest.fn(() => ({
    state: 'connected',
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
      expect(baseRepository.connection.state).toBe('connected');
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

  describe('applyFilters', () => {
    test('should return valid conditions and values', () => {
      const filterData = {
        name: {
          type: 'lik',
          data: 'samuel'
        },
        email: {
          type: 'eql',
          data: 'email@email'
        },
      };
      const result = baseRepository.applyFilters(filterData);

      expect(result).toEqual({
        conditions: ' AND name like ? AND email = ?',
        values: [ '%samuel%', 'email@email' ]
      });
    });

    test('should return empty object conditions and values', () => {
      const result = baseRepository.applyFilters({});

      expect(result).toEqual({
        conditions: '',
        values: []
      });
    });

    test('should return undefined', () => {
      const result = baseRepository.applyFilters({ name: {}, email: {}});

      expect(result).toEqual({
        conditions: ' AND name undefined ? AND email undefined ?',
        values: [ undefined, undefined ]
      });
    });

    test('should throw error', () => {
      expect(() => {
        baseRepository.applyFilters(undefined);
      }).toThrow();
    });
  });

  describe('getOperator', () => {
    test('should return empty object conditions and values', () => {
      let result = baseRepository.getOperator('eql');
      expect(result).toEqual('=');
      result = baseRepository.getOperator('gt');
      expect(result).toEqual('>');
      result = baseRepository.getOperator('gte');
      expect(result).toEqual('>=');
      result = baseRepository.getOperator('lt');
      expect(result).toEqual('<');
      result = baseRepository.getOperator('lte');
      expect(result).toEqual('<=');
      result = baseRepository.getOperator('lik');
      expect(result).toEqual('like');
      result = baseRepository.getOperator('neq');
      expect(result).toEqual('<>');
      result = baseRepository.getOperator('nnu');
      expect(result).toEqual('IS NOT NULL');
      result = baseRepository.getOperator('nul');
      expect(result).toEqual('IS NULL');
    });
  });

  describe('verifyConnection', () => {
    test('should return true', async () => {
      const result = await baseRepository.verifyConnection();
      expect(result).toEqual(true);
    });

    test('should return true if reconnect', async () => {
      baseRepository.connection.state = 'disconnected';
      baseRepository.connection.connect.mockImplementation(callback => callback(false));
      const result = await baseRepository.verifyConnection();
      expect(result).toEqual(true);
    });

    test('should throw error if reconnect is failed', async () => {
      baseRepository.connection.state = 'disconnected';
      baseRepository.connection.connect.mockImplementation(callback => callback(true));
      try {
        await baseRepository.verifyConnection();
      } catch (e) {
        expect(e).toEqual(true);
      }
    });
  });

  describe('execQuery', () => {
    test('should return result', async () => {
      const query = `
        SELECT
          name,
          email
        FROM
          users
        WHERE
          email = ?
      `;
      const params = [
        "email@email.com"
      ];
      baseRepository.connection.query.mockImplementation(
        (...args) => {
          args[2](false, ['result']);
        }
      );
      let result = await baseRepository.execQuery(query, params);
      expect(result).toEqual(['result']);
      result = await baseRepository.execQuery(query);
      expect(result).toEqual(['result']);
    });

    test('should throw error', async () => {
      const query = `
        SELECT
          name,
          email
        FROM
          users
        WHERE
          email = ?
      `;
      const params = [
        "email@email.com"
      ];
      baseRepository.connection.query.mockImplementation(
        (...args) => {
          args[2](true, []);
        }
      );
      try {
        await baseRepository.execQuery(query, params);
      } catch (e) {
        expect(e).toEqual(true);
      }
    });
  });

  describe('execSingleQuery', () => {
    test('should return result', async () => {
      const query = `
        SELECT
          name,
          email
        FROM
          users
        WHERE
          email = ?
      `;
      const params = [
        "email@email.com"
      ];
      baseRepository.connection.query.mockImplementation(
        (...args) => {
          args[2](false, ['result']);
        }
      );
      let result = await baseRepository.execSingleQuery(query, params);
      expect(result).toEqual('result');
      result = await baseRepository.execSingleQuery(query);
      expect(result).toEqual('result');
    });

    test('should throw error', async () => {
      const query = `
        SELECT
          name,
          email
        FROM
          users
        WHERE
          email = ?
      `;
      const params = [
        "email@email.com"
      ];
      baseRepository.connection.query.mockImplementation(
        (...args) => {
          args[2](true, []);
        }
      );
      try {
        await baseRepository.execSingleQuery(query, params);
      } catch (e) {
        expect(e).toEqual(true);
      }
    });
  });
});

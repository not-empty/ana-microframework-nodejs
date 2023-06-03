import { BaseRepository } from '#src/repositories/BaseRepository.js';

jest.mock('mysql', () => ({
  createConnection: jest.fn(() => ({
    state: 'disconnected',
    connect: jest.fn((callback) => callback()),
    query: jest.fn((query, params, callback) => callback(null, {})),
  })),
}));

describe('BaseRepository', () => {
  let baseRepository;

  beforeEach(() => {
    baseRepository = new BaseRepository('table_name');
  });

  describe('constructor', () => {
    test('should create a connection with the correct configuration', () => {
      expect(baseRepository.connection).toBeDefined();
      expect(baseRepository.connection.host).toBe(process.env.DB_HOST);
      expect(baseRepository.connection.port).toBe(process.env.DB_PORT);
      expect(baseRepository.connection.user).toBe(process.env.DB_USER);
      expect(baseRepository.connection.password).toBe(process.env.DB_PASSWORD);
      expect(baseRepository.connection.database).toBe(process.env.DB_DATABASE);
    });

    test('should set the default value for maxAmountRows', () => {
      expect(baseRepository.maxAmountRows).toBe(25);
    });
  });

  // describe('getById', () => {
  //   test('should execute the single query with the correct SQL', async () => {
  //     const execSingleQueryMock = jest.spyOn(baseRepository, 'execSingleQuery');
  //     const id = '123';

  //     await baseRepository.getById(id);

  //     expect(execSingleQueryMock).toHaveBeenCalledWith(
  //       `
  //       SELECT
  //         *
  //       FROM
  //         table_name
  //       WHERE
  //         id = ?
  //         AND deleted IS NULL
  //     `,
  //       [id]
  //     );
  //   });
  // });
});

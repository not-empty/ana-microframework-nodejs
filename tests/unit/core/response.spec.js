import { ulid } from 'ulid';
import Response from '#src/core/response.js';

jest.mock('ulid', () => ({
  ulid: jest.fn().mockReturnValue('mockedUlid'),
}));

describe('Response', () => {
  describe('send', () => {
    test('should return a response object with the provided token, data, and message', () => {
      const responseInstance = new Response();
      const result = responseInstance.send('mockedToken', ['data1', 'data2'], 'mockedMessage');
  
      expect(result).toEqual({
        data: ['data1', 'data2'],
        profiler: expect.any(Number),
        token: 'mockedToken',
        requestId: 'mockedUlid',
        message: 'mockedMessage',
      });
      expect(ulid).toHaveBeenCalledTimes(1);
    });

    test('should profile equal zero if request is instant return', () => {
      const responseInstance = new Response();
      responseInstance.start = 100000000;
      const result = responseInstance.send('mockedToken', ['data1', 'data2'], 'mockedMessage');

      expect(result).toEqual({
        data: ['data1', 'data2'],
        profiler: expect.any(Number),
        token: 'mockedToken',
        requestId: 'mockedUlid',
        message: 'mockedMessage',
      });
      expect(ulid).toHaveBeenCalledTimes(1);
    });

    test('should return empty data and response without message', () => {
      const responseInstance = new Response();
      responseInstance.start = 100000000;
      const result = responseInstance.send('mockedToken');

      expect(result).toEqual({
        data: [],
        profiler: 0,
        token: 'mockedToken',
        requestId: 'mockedUlid',
      });
      expect(ulid).toHaveBeenCalledTimes(1);
    });
  });
});

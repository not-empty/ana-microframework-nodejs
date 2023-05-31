import { ulid } from 'ulid';
import Response from '#src/core/response.js';

jest.mock('ulid', () => ({
  ulid: jest.fn().mockReturnValue('mockedUlid'),
}));

describe('Response', () => {
  let originalDateNow;

  beforeAll(() => {
    originalDateNow = Date.now;
    global.Date.now = jest.fn().mockReturnValue(1625520000000); // Mock a fixed date (July 6, 2021 00:00:00 UTC)
  });

  afterAll(() => {
    global.Date.now = originalDateNow;
  });

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
      expect(ulid).toHaveBeenCalled();
    });
  });
});

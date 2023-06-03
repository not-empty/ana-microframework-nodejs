import RequestParamsMiddleware from '#src/middlewares/RequestParamsMiddleware.js';

describe('RequestParamsMiddleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      query: {},
    };
    res = {
      locals: {
        page: 0,
      },
    };
    next = jest.fn();
  });

  describe('process', () => {
    test('should set default values if query parameters are missing', () => {
      const requestParamsMiddleware = new RequestParamsMiddleware();
      const process = requestParamsMiddleware.process([], []);
      process(req, res, next);

      expect(res.locals.page).toBe(1);
      expect(res.locals.classOrder).toBe('asc');
      expect(res.locals.order).toBe('id');
      expect(res.locals.fields).toEqual(['*']);
    });

    test('should set provided query parameters', () => {
      const requestParamsMiddleware = new RequestParamsMiddleware();
      req.query = {
        page: 2,
        class: 'desc',
        order: 'name',
        fields: 'id,name',
      };
      const fields = ['id', 'name', 'age'];
      const order = ['id', 'name'];
      const process = requestParamsMiddleware.process(fields, order);
      process(req, res, next);

      expect(res.locals.page).toBe(2);
      expect(res.locals.classOrder).toBe('desc');
      expect(res.locals.order).toBe('name');
      expect(res.locals.fields).toEqual(['id', 'name']);
    });

    test('should clean order parameter if it is not in the allowed list', () => {
      const requestParamsMiddleware = new RequestParamsMiddleware();
      req.query = {
        order: 'invalid',
      };
      const process = requestParamsMiddleware.process(['id', 'name'], ['id', 'name']);
      process(req, res, next);

      expect(res.locals.order).toBe('id');
    });

    test('should clean fields parameter and keep only allowed fields', () => {
      const requestParamsMiddleware = new RequestParamsMiddleware();
      req.query = {
        fields: 'id,age',
      };
      const process = requestParamsMiddleware.process(['id', 'name', 'age'], ['id', 'name']);
      process(req, res, next);

      expect(res.locals.fields).toEqual(['id', 'age']);
    });

    test('should set "*" for fields parameter if it is not provided', () => {
      const requestParamsMiddleware = new RequestParamsMiddleware();
      req.query = {
        locals: {
          fields: undefined
        }
      };
      const process = requestParamsMiddleware.process(['id', 'name', 'age'], ['id', 'name']);
      process(req, res, next);

      expect(res.locals.fields).toEqual(['*']);
    });
  });
});

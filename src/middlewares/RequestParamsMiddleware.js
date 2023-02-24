class RequestParamsMiddleware {
  process(fields, order) {
    return function(req, res, next) {
      const page = req.query.page ?? 1;
      const classOrder = req.query.class ?? 'asc';
  
      let orderToClean = req.query.order ?? 'id';
      if (!order.find((element) => element == orderToClean)) {
        orderToClean = 'id';
      }

      let fieldsToClean = (req.query.fields ?? '*').split(',');
      fieldsToClean = fields.filter(x => fieldsToClean.includes(x));
  
      res.locals.page = page;
      res.locals.classOrder = classOrder;
      res.locals.order = orderToClean;
      res.locals.fields = fieldsToClean;
  
      next();
    }
  }
}

module.exports = new RequestParamsMiddleware();

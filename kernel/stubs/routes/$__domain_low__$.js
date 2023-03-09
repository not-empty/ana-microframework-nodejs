import {
  fields,
  order
} from '#src/domains/$__domain_low__$/parameters/$__domain__$ListParameter.js';
import RequestParamsMiddleware from '#src/middlewares/RequestParamsMiddleware.js';
import JwtMiddleware from '#src/middlewares/JwtMiddleware.js';
import { Router } from 'express';
import {
  $__domain__$ListController,
  $__domain__$DetailController,
  $__domain__$DeleteController,
  $__domain__$EditController,
  $__domain__$AddController,
  $__dead_list_controller__$,
  $__dead_detail_controller__$,
  $__bulk_controller__$,
} from '#src/domains/$__domain_low__$/controllers/index.js';
import {
  $__domain__$AddValidator,
  $__domain__$EditValidator,
  $__bulk_validator__$,
} from '#src/domains/$__domain_low__$/validators/index.js';

const $__domain_low__$Router = Router();

$__domain_low__$Router.use(new JwtMiddleware().process);
$__domain_low__$Router.use(new RequestParamsMiddleware().process(fields, order));

$__domain_low__$Router.get(
  '/list',
  (req, res) => new $__domain__$ListController().process(req, res)
);

$__domain_low__$Router.get(
  '/detail/:id',
  (req, res) => new $__domain__$DetailController().process(req, res)
);

$__domain_low__$Router.delete(
  '/delete/:id',
  (req, res) => new $__domain__$DeleteController().process(req, res)
);

$__domain_low__$Router.post(
  '/add',
  new $__domain__$AddValidator().getValidations(),
  new $__domain__$AddValidator().checkRules,
  (req, res) => new $__domain__$AddController().process(req, res)
);

$__domain_low__$Router.patch(
  '/edit/:id',
  new $__domain__$EditValidator().getValidations(),
  new $__domain__$EditValidator().checkRules,
  (req, res) => new $__domain__$EditController().process(req, res)
);

$__dead_list__$;
$__dead_detail__$;
$__bulk__$;

export { $__domain_low__$Router };

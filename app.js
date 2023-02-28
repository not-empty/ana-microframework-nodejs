require('dotenv').config();

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const Response = require('./src/core/response');
const route = require('./src/core/route');

const app = express();
const response = new Response();

app.use(bodyParser.json());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const healthRouter = require(`${route.getRouteDir()}health`);
app.use('/', healthRouter);

const routeList = route.getRouteList();
for (const [domain, file] of routeList) {
  const router = require(file);

  app.use(
    `/${domain}`,
    router
  );
}

app.use((req, res) => {
  res.status(404).send(
    response.send(
      null,
      [],
      'Route not found'
    )
  );
});

module.exports = app;

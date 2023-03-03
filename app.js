import 'dotenv/config';
import express from 'express';
import { Response } from '#src/core/response.js';
import compression from 'compression';
import { indexRoute } from '#root/routes/index.js';
import BodyParser from 'body-parser';

const app = express();
const response = new Response();

app.use(BodyParser.json());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoute);

app.use((req, res) => {
  res.status(404).send(
    response.send(
      null,
      [],
      'Route not found'
    )
  );
});

export { app };

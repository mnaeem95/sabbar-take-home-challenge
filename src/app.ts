import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import { apiErrorHandler, ApiError } from './common';
import customerRoutes from './routes/customer.routes';
import { NOT_FOUND } from './utils/http-codes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();

    this.app.all('*', (req, res, next) => {
      next(new ApiError(NOT_FOUND, `Can't find route ${req.originalUrl} on this Node server`));
    });
  }

  private initializeMiddlewares() {
    const urlencodedParser = bodyParser.urlencoded({ extended: false });

    this.app.use(cors());
    this.app.use(morgan('combined'));
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(urlencodedParser);
  }

  private initializeRoutes() {
    this.app.use(customerRoutes);
  }

  private initializeErrorHandling() {
    this.app.use(apiErrorHandler);
  }
}

export default new App().app;

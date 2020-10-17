import { config } from 'dotenv';
config(); // dotenv config

import * as http from 'http';
import * as stoppable from 'stoppable';
import { promisify } from 'util';

import { SERVER_STARTED_MSG, SERVER_FAILED } from './utils/messages';
import { MongooseCommonUtils } from './utils/mongoose';
import { catchErrors, gracefulShutdown, healthCheck } from './common';

const PORT = process.env.SERVER_PORT;
const MONGO_CONN_STR = process.env.MONGO_CONN_STR;
const WAIT_BEFORE_SERVER_CLOSE = parseInt(process.env.WAIT_BEFORE_SERVER_CLOSE, 10) || 30;

const start = async () => {
  // initialize app
  const app = require('./app').default;

  const mongooseCommonUtils = new MongooseCommonUtils();

  app.use(`/health`, healthCheck([mongooseCommonUtils.healthCheck]));

  const server = stoppable(http.createServer(app));
  const closeServer = promisify(server.stop).bind(server);

  catchErrors([closeServer, mongooseCommonUtils.shutdown], WAIT_BEFORE_SERVER_CLOSE);

  gracefulShutdown([closeServer, mongooseCommonUtils.shutdown], WAIT_BEFORE_SERVER_CLOSE);

  /* Graceful Start */

  // 1 - Start Server
  server.once('listening', () => {
    console.info('Server', SERVER_STARTED_MSG(PORT, process.pid));
  });

  server.once('error', err => {
    console.error('Server', SERVER_FAILED, null, err);
    process.kill(process.pid, 'SIGTERM');
  });

  server.listen(PORT);

  // 2- Connect DB
  await mongooseCommonUtils.connectDB(MONGO_CONN_STR);
};

start();

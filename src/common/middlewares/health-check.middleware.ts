import { Request, RequestHandler, Response } from 'express';

// tslint:disable-next-line: prefer-array-literal
export default function healthCheckFactory(checks: Array<() => Promise<any>> = []): RequestHandler {
  // respond with '503 Service Unavailable' once the termination signal is received

  let shuttingDown = false;

  process.once('SIGTERM', () => {
    shuttingDown = true;
  });

  return async function healthCheck(req: Request, res: Response) {
    if (shuttingDown) {
      res.status(503).send({
        status: 'error',
        details: {
          reason: 'service is shutting down',
        },
      });
      return;
    }

    for (const check of checks) {
      try {
        await check();
      } catch (err) {
        console.error('HealthCheck', `health check failed`, null, err);

        res.status(500).send({
          status: err.message,
        });
        return;
      }
    }

    res.status(200).send({
      status: 'ok',
    });
  };
}

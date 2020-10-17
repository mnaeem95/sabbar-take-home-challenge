export default function registerGracefulShutdown(
  this: any,
  // tslint:disable-next-line: prefer-array-literal
  closeHandlers: Array<() => Promise<any>> = [],
  timeout: number = 30,
) {
  // gracefully shutdown on SIGTERM or SIGINT signal
  process.once('SIGTERM', gracefulShutDown.bind(this, 'SIGTERM'));
  process.once('SIGINT', gracefulShutDown.bind(this, 'SIGINT'));

  async function gracefulShutDown(signal = 'SIGTERM') {
    console.info('GracefulShutDown', `got kill signal (${signal}), starting graceful shut down`);

    // shut down anyway after `timeout` seconds
    if (timeout) {
      setTimeout(() => {
        console.error('GracefulShutDown', `could not finish in time, forcefully exiting`);

        process.exit(1);
      }, timeout * 1000).unref();
    }

    // release resources
    let isError = false;
    for (const handler of closeHandlers) {
      try {
        await Promise.resolve(handler());
      } catch (err) {
        console.error('GracefulShutDown', `error happened during graceful shut down`, null, err);
        isError = true;
      }
    }

    if (isError) {
      process.exit(1);
    }

    console.info('GracefulShutDown', 'graceful shut down finished');
    process.kill(process.pid, signal);
  }
}

// tslint:disable-next-line: prefer-array-literal
export function catchErrors(closeHandlers: Array<() => Promise<any>> = [], timeout = 30) {
  // it is not safe to resume normal operation after 'uncaughtException'.
  const uncaughtExceptionHandler = async (err: Error) => {
    console.error('UncaughtExceptionHandler', `uncaught exception`, null, err);

    // shut down anyway after `timeout` seconds
    if (timeout) {
      setTimeout(() => {
        console.log('UncaughtExceptionHandler', 'could not finish in time, forcefully exiting');

        process.exit(1);
      }, timeout * 1000).unref();
    }

    for (const handler of closeHandlers) {
      try {
        await Promise.resolve(handler());
      } catch (err) {
        console.error('UncaughtExceptionHandler', `failed to close resource`, null, err);
      }
    }

    process.exit(1);
  };

  process.on('uncaughtException', uncaughtExceptionHandler);

  // a Promise is rejected and no error handler is attached.
  const unhandledRejectionHandler = async (reason: any = {}, promise: Promise<any>) => {
    console.error('UnhandledRejectionHandler', `unhandled promise rejection`, null, reason);

    // shut down anyway after `timeout` seconds
    if (timeout) {
      setTimeout(() => {
        console.log('unhandledRejectionHandler', 'could not finish in time, forcefully exiting');
        process.exit(1);
      }, timeout * 1000).unref();
    }

    for (const handler of closeHandlers) {
      try {
        await Promise.resolve(handler());
      } catch (err) {
        console.error('unhandledRejectionHandler', `failed to close resource`, null, err);
      }
    }

    process.exit(1);
  };

  process.on('unhandledRejection', unhandledRejectionHandler);

  return () => {
    process.off('uncaughtException', uncaughtExceptionHandler);
    process.off('unhandledRejection', unhandledRejectionHandler);
  };
}

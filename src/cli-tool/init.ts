import * as welcome from 'cli-welcome';
import * as checkNode from 'cli-check-node';
import * as unhandledError from 'cli-handle-unhandled';

export const init = async () => {
  await unhandledError();
  checkNode(`12`);
  welcome(
    { title: `Supply & Demand Matching CLI`, tagLine: `by Muhammad Naeem` },
    {
      bgColor: `#81EF96`,
      color: `#FFFFFF`,
      bold: true,
      clear: true,
      version: `v0.0.1`,
    },
  );
};

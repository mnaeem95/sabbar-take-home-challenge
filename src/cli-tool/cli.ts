import * as meow from 'meow';
import * as chalk from 'chalk';

const green = chalk.green;
const yellow = chalk.yellow;
const cyan = chalk.cyan;

export const cli = meow(
  `
    Usage
      ${green(`sabbar`)} ${cyan(`<command>`)} ${yellow(`[--option]`)}

    Commands
      ${cyan(`customer`)}   Show existing list of customers
      ${cyan(`cruiser`)}    Show existing list of cruisers
      ${cyan(`match`)}      Show each customer and assigned driver & List of failed fulfillment customers & idle drivers
      ${cyan(`manual`)}     Show Help
      ${cyan(`exit`)}       Kill the CLI

    Examples
    ${green(`sabbar`)} ${cyan(`customer`)}
    ${green(`sabbar`)} ${cyan(`cruiser`)}
    ${green(`sabbar`)} ${cyan(`match`)}
    ${green(`sabbar`)} ${cyan(`manual`)}
    ${green(`sabbar`)} ${cyan(`exit`)}
  `,
);

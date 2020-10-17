import * as chalk from 'chalk';
import * as Table from 'cli-table3';

const green = chalk.green;
const red = chalk.red;
const yellow = chalk.yellow;
const dim = chalk.dim;

export const tableConfig = {
  head: [
    `${dim(`Id`)}`,
    `${green(`Name`)}`,
    `${yellow(`Latitude`)}`,
    `${yellow(`Latitude`)}`,
    `${green(`Number Of Rides`)}`,
    `${red(`Rating`)}`,
  ],
  matchesHead: [
    `${dim(`Customer Id`)}`,
    `${green(`Customer Name`)}`,
    `${yellow(`Customer Rides Count`)}`,
    `${yellow(`Customer Rating`)}`,
    `${dim(`Driver Id`)}`,
    `${green(`Driver Name`)}`,
    `${yellow(`Driver Rides Count`)}`,
    `${yellow(`Driver Rating`)}`,
  ],
  style: { head: ['cyan'] },
};

export const showTable = (data: any, headType = 'head') => {
  const { style } = tableConfig;

  const table = new Table({ style, head: tableConfig[headType] });
  // table is an Array, so you can `push`, `unshift` and `splice`

  table.push(...data.map(ele => Object.values(ele)));

  if (table.length > 0) {
    console.log(table.toString());
  }
};

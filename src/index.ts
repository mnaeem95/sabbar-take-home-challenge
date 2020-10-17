#!/usr/bin/env node

import * as alert from 'cli-alerts';
import * as ora from 'ora';
import { cli } from './cli-tool/cli';
import { init } from './cli-tool/init';
import { showTable } from './cli-tool/table';
import { CustomerService } from './services/customer.service';
import { DriverService } from './services/driver.service';
import { SupplyAndDemandMatchingService } from './services/supply-and-demand-matching.service';
import { MongooseCommonUtils } from './utils/mongoose';

const MONGO_CONN_STR =
  'mongodb+srv://naeem:mzOEcgorEQUwiXyF@cluster0.yq4ag.azure.mongodb.net/concruise?retryWrites=true';

const [input] = cli.input;

const mongooseCommonUtils = new MongooseCommonUtils();

const customerService = new CustomerService();
const driverService = new DriverService();
const supplyAndDemandMatchingService = new SupplyAndDemandMatchingService();

const start = async (input: string) => {
  const spinner = ora({ text: '' });

  await mongooseCommonUtils.connectDB(MONGO_CONN_STR);
  await init();

  switch (input) {
    case 'customer': {
      spinner.start();

      const customers = await customerService.getAllCustomers();
      spinner.stop();

      alert({ type: `info`, msg: `Show existing list of customers` });
      showTable(JSON.parse(JSON.stringify(customers)));

      break;
    }
    case 'cruiser': {
      spinner.start();

      const drivers = await driverService.getAllDrivers();
      spinner.stop();

      alert({ type: `info`, msg: `Show existing list of cruisers` });
      showTable(JSON.parse(JSON.stringify(drivers)));

      break;
    }
    case 'match': {
      spinner.start();

      const {
        matches,
        failedFulfillmentCustomers,
        idleDrivers,
      } = await supplyAndDemandMatchingService.matchCustomersWithDrivers();

      spinner.stop();

      alert({ type: `info`, msg: `Show each customer and assigned driver` });
      showTable(JSON.parse(JSON.stringify(matches)), 'matchesHead');

      alert({ type: `info`, msg: `List of idle drivers` });
      showTable(JSON.parse(JSON.stringify(idleDrivers)));

      alert({ type: `info`, msg: `List of failed fulfillment customers` });
      showTable(JSON.parse(JSON.stringify(failedFulfillmentCustomers)));

      break;
    }
    case 'manual': {
      await cli.showHelp(0);
      break;
    }
    case 'exit': {
      alert({ type: `info`, msg: `Killing the CLI!` });

      process.exit(0);
    }
  }

  await mongooseCommonUtils.shutdown();
};

start(input);

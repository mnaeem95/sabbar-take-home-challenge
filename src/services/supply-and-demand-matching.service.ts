import getDistance from 'geolib/es/getDistance';
import { IUser } from '../interfaces/user.interface';
import { CustomerService } from '../services/customer.service';
import { DriverService } from '../services/driver.service';

export class SupplyAndDemandMatchingService {
  private readonly customerService: CustomerService = new CustomerService();
  private readonly driverService: DriverService = new DriverService();

  calculateMatchingFactorsValue = (customer: IUser, driver: IUser): number => {
    let score = 0;

    const distance =
      getDistance(
        {
          latitude: customer.locationLatitude,
          longitude: customer.locationLongitude,
        },
        {
          latitude: driver.locationLatitude,
          longitude: driver.locationLongitude,
        },
      ) / 1000;

    if (distance <= 3) {
      score += 7;
    } else if (distance <= 5) {
      score += 3;
    }

    if (customer.rating && driver.rating && customer.rating >= driver.rating) {
      score += 2;
    }

    if (customer.numberOfRides && driver.numberOfRides && customer.numberOfRides <= 2 && driver.numberOfRides >= 3) {
      score += 5;
    } else if (customer.numberOfRides > 2 && driver.numberOfRides < 3) {
      score += 2;
    }

    return score;
  };

  matchCustomersWithDrivers = async () => {
    const matches = [];
    const failedFulfillmentCustomers = [];

    let idleDrivers = [];

    const customers = await this.customerService.getAllCustomers();
    let drivers = await this.driverService.getAllDrivers();
    drivers = drivers.map(driver => ({ ...driver, matched: false }));

    customers.forEach(customer => {
      let maxScore = -1;
      let matchedDriverIndex = -1;
      let matchedDriver: IUser;

      drivers.forEach((driver, index) => {
        const score = this.calculateMatchingFactorsValue(customer, driver);
        if (!driver.matched && score > maxScore) {
          maxScore = score;
          matchedDriver = driver;
          matchedDriverIndex = index;
        }
      });

      if (matchedDriver) {
        matches.push({
          customerId: customer._id,
          customerName: customer.name,
          customerRidesCount: customer.numberOfRides,
          customerRating: customer.rating,
          driverId: matchedDriver._id,
          driverName: matchedDriver.name,
          driverRidesCount: matchedDriver.numberOfRides,
          driverRating: matchedDriver.rating,
        });

        drivers[matchedDriverIndex].matched = true;
      } else {
        failedFulfillmentCustomers.push(customer);
      }
    });

    idleDrivers = drivers.filter(({ matched }) => !matched);

    return { matches, failedFulfillmentCustomers, idleDrivers };
  };
}

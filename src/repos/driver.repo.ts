import { IUser } from '../interfaces/user.interface';
import { driverModel } from '../models/driver.model';
import { BaseRepo } from '../utils/base-repository';

export class DriverRepo extends BaseRepo<IUser> {
  constructor() {
    super(driverModel);
  }
}

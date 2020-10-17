import { IUser } from '../interfaces/user.interface';
import { customerModel } from '../models/customer.model';
import { BaseRepo } from '../utils/base-repository';

export class CustomerRepo extends BaseRepo<IUser> {
  constructor() {
    super(customerModel);
  }
}

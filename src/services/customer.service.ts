import { ApiError } from '../common';
import { UpdateUserDto, UserDto } from '../dtos/user.dto';
import { IUser } from '../interfaces/user.interface';
import { CustomerRepo } from '../repos/customer.repo';
import * as httpCodes from '../utils/http-codes';
import { NOT_FOUND_MSG, UNABLE_TO_DELETE_USERS_MSG } from '../utils/messages';

const { BAD_REQUEST } = httpCodes;

export class CustomerService {
  private readonly customerRepo: CustomerRepo = new CustomerRepo();

  getAllCustomers = async (): Promise<IUser[]> => {
    const customers: IUser[] = await this.customerRepo.getAll();

    return customers;
  };

  createCustomer = async (userDto: UserDto): Promise<IUser> => {
    const savedCustomer = await this.customerRepo.save(userDto);

    return savedCustomer;
  };

  updateCustomer = async (userDto: UpdateUserDto): Promise<IUser> => {
    const updatedCustomer: IUser = await this.customerRepo.update(userDto._id, userDto);

    if (!updatedCustomer) {
      throw new ApiError(BAD_REQUEST, NOT_FOUND_MSG(userDto._id));
    }

    return updatedCustomer;
  };

  deleteCustomers = async (userIds: string[]): Promise<number> => {
    const deletedCount: number = await this.customerRepo.deleteMany({ _id: { $in: userIds } });

    if (!deletedCount) {
      throw new ApiError(BAD_REQUEST, UNABLE_TO_DELETE_USERS_MSG(userIds));
    }

    return deletedCount;
  };
}

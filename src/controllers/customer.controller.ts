import * as express from 'express';
import { UpdateUserDto, UserDto } from '../dtos/user.dto';
import { IUser } from '../interfaces/user.interface';
import { CustomerService } from '../services/customer.service';

export class CustomerController {
  private readonly customerService: CustomerService = new CustomerService();

  getAllCustomers = async (request: express.Request, response: express.Response): Promise<void> => {
    const customers: IUser[] = await this.customerService.getAllCustomers();

    response.send(customers);
  };

  createCustomer = async (request: express.Request, response: express.Response): Promise<void> => {
    const customerDto: UserDto = request.body;

    const savedCustomer: IUser = await this.customerService.createCustomer(customerDto);

    response.send(savedCustomer);
  };

  updateCustomer = async (request: express.Request, response: express.Response): Promise<void> => {
    const customerDto: UpdateUserDto = request.body;

    const updatedCustomer: IUser = await this.customerService.updateCustomer(customerDto);

    response.send(updatedCustomer);
  };

  deleteCustomers = async (request: express.Request, response: express.Response): Promise<void> => {
    const userIds: string[] = request.body.userIds;

    const deletedCount: number = await this.customerService.deleteCustomers(userIds);

    response.send({ deletedCount });
  };
}

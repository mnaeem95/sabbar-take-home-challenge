import { IUser } from '../interfaces/user.interface';
import { DriverRepo } from '../repos/driver.repo';

export class DriverService {
  private readonly driverRepo: DriverRepo = new DriverRepo();

  getAllDrivers = async (): Promise<IUser[]> => {
    const drivers: IUser[] = await this.driverRepo.getAll();

    return drivers;
  };
}

import * as express from 'express';
import { asyncHandler, validationHandler } from '../common';
import { CustomerController } from '../controllers/customer.controller';
import { DeleteUsersDto, UpdateUserDto, UserDto } from '../dtos/user.dto';
import { ROUTES } from '../utils/constants';

const router = express.Router();
const controller = new CustomerController();

router.get(ROUTES.GET_ALL, asyncHandler(controller.getAllCustomers));
router.post(ROUTES.CREATE, validationHandler(UserDto), asyncHandler(controller.createCustomer));
router.put(ROUTES.UPDATE, validationHandler(UpdateUserDto), asyncHandler(controller.updateCustomer));
router.delete(ROUTES.DELETE, validationHandler(DeleteUsersDto), asyncHandler(controller.deleteCustomers));

export default router;

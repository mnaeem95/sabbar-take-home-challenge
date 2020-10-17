import * as mongoose from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { userSchema } from './user.schema';

export const customerModel = mongoose.model<IUser & mongoose.Document>('Customer', userSchema);

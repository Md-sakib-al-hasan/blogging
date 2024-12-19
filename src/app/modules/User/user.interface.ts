/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

//create user interface
export type Tuser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserModel extends Model<Tuser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<Tuser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;

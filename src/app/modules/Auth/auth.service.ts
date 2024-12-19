import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import User from '../User/user.modul';
import { Tlogin } from './auth.interface';
import { createToken } from '../User/user.utils';
import config from '../../config';

//create token whit valide user
const loginUser = async (payload: Tlogin) => {
  const user = await User.isUserExistsByEmail(payload.email);
  //if the user doesn't exits
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  //if the user is blocked
  if (user?.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! ');
  }

  //match passworld
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

  const jwtPayload = {
    useremail: user.email,
    role: user.role,
  };

  const accesstoken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expires_in as string
  );

  return accesstoken;
};

export const AuthServices = {
  loginUser,
};

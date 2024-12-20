import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/User/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import User from '../modules/User/user.modul';

// Authorization middleware to validate user access based on roles and token verification.
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }
    if (!token || !token.startsWith('Bearer ')) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }
    const [, newtoken] = token.split(' ');

    const decoded = jwt.verify(
      newtoken,
      config.jwt_secret as string
    ) as JwtPayload;

    const { role, useremail } = decoded;

    const user = await User.isUserExistsByEmail(useremail);
    //if the user doesn't exits
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
    }

    //if the user is blocked
    if (user?.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! ');
    }
    //authorized user or admin authorisation
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not authorized  hi!'
      );
    }
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;

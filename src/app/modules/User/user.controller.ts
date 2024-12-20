import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendRequest from '../../utils/sendRequest';
import { StatusCodes } from 'http-status-codes';

//create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createuserIntoDB(req.body);
  const { _id, name, email } = result;
  sendRequest(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: { _id, name, email },
  });
});

export const UserController = {
  createUser,
};

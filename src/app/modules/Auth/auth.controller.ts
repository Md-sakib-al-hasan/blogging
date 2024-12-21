import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendRequest from '../../utils/sendRequest';
import { AuthServices } from './auth.service';
import config from '../../config';

//login with email and passwolrd   
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  res.cookie('accesstoken', result, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendRequest(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful',
    data: {
      token: result,
    },
  });
});

export const AuthController = {
  loginUser,
};

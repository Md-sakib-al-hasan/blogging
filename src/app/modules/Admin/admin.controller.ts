import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

import { StatusCodes } from 'http-status-codes';
import { AdminService } from './admin.service';
import sendRequestWithData from '../../utils/sendRequestwithoutmongoosedata';

//Allows an admin to block a user by updating the isBlocked property to true
const BlockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  await AdminService.BlockuserIntoDB(userId);
  sendRequestWithData(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
  });
});
// Allows an admin to delete any blog by its ID
const deleteSingleBLog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AdminService.deleteBLogFromDB(id);
  sendRequestWithData(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const AdminController = {
  BlockUser,
  deleteSingleBLog,
};

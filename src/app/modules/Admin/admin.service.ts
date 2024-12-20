import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import Blog from '../Blog/blog.model';
import User from '../User/user.modul';
//Allows an admin to block a user by updating the isBlocked property to true
const BlockuserIntoDB = async (id: string) => {
  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, `Pleace Enter id`);
  }
  const user = await User.findById(id);
  if (user?.role !== 'user') {
    throw new AppError(StatusCodes.NOT_FOUND, `The user isn't exities`);
  }
  const result = await User.findByIdAndUpdate(id, { isBlocked: true });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, `Blog with id ${id} not found.`);
  }
  return result;
};

//Allows an admin to delete any blog by its ID
const deleteBLogFromDB = async (id: string) => {
  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, `Pleace Enter id`);
  }
  const result = await Blog.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, `Blog with id ${id} not found.`);
  }
  return result;
};

export const AdminService = {
  BlockuserIntoDB,
  deleteBLogFromDB,
};

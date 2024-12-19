import Blog from '../Blog/blog.model';
import User from '../User/user.modul';
//Allows an admin to block a user by updating the isBlocked property to true
const BlockuserIntoDB = async (id: string) => {
  if (!id) {
    throw new Error(`Pleace Enter id`);
  }
  const result = await User.findByIdAndUpdate(id, { isBlocked: true });
  if (!result) {
    throw new Error(`Blog with id ${id} not found.`);
  }
  return result;
};

//Allows an admin to delete any blog by its ID
const deleteBLogFromDB = async (id: string) => {
  if (!id) {
    throw new Error(`Pleace Enter id`);
  }
  const result = await Blog.findByIdAndDelete(id);
  if (!result) {
    throw new Error(`Blog with id ${id} not found.`);
  }
  return result;
};

export const AdminService = {
  BlockuserIntoDB,
  deleteBLogFromDB,
};

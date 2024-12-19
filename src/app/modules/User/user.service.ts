import { Tuser } from './user.interface';
import User from './user.modul';

//create user means create user and admin
const createuserIntoDB = async (payload: Tuser) => {
  const result = await User.create(payload);
  return result;
};

export const UserServices = {
  createuserIntoDB,
};

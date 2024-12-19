import express from 'express';
import { UserController } from './user.controller';
import ValidateRequest from '../../middleWares/validateRequest';
import { UserValidtions } from './user.validation';
import auth from '../../middleWares/auth';

const router = express.Router();
//create user
router.post(
  '/register',
  auth('admin'),
  ValidateRequest(UserValidtions.userchmeavalidations),
  UserController.createUser
);

export const UserRoutes = router;

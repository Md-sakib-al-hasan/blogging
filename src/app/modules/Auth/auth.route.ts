import express from 'express';
import ValidateRequest from '../../middleWares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();
//login
router.post(
  '/login',
  ValidateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

export const AuthRouters = router;

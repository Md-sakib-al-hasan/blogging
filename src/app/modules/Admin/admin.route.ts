import express from 'express';
import auth from '../../middleWares/auth';
import { AdminController } from './admin.controller';
import ValidateRequest from '../../middleWares/validateRequest';
import { AdminValidations } from './admin.Validation';

const router = express.Router();
// Allows an admin to block a user by updating the isBlocked property to true
router.patch('/users/:userId/block',ValidateRequest(AdminValidations.userBlockIdvalidationSchema), auth('admin'), AdminController.BlockUser);
// Allows an admin to delete any blog by its ID
router.delete('/blogs/:id', auth('admin'),ValidateRequest(AdminValidations.IdvalidationSchema), AdminController.deleteSingleBLog);

export const AdminRouters = router;

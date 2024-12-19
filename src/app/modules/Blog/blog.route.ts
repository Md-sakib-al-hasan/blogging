import express from 'express';
import ValidateRequest from '../../middleWares/validateRequest';
import { BlogValidtions } from './blog.validation';
import { BlogController } from './blog.controller';
import auth from '../../middleWares/auth';
const router = express.Router();
//create blog
router.post(
  '/',
  auth('user'),
  ValidateRequest(BlogValidtions.blogValidationSchema),
  BlogController.createBlog
);

//update blog by user
router.patch(
  '/:id',
  auth('user'),
  ValidateRequest(BlogValidtions.blogUpdateValidationSchema),
  BlogController.updateSingleBlog
);
//get blog by user
router.delete('/:id', auth('user'), BlogController.deleteSingleBlog);

//get all blog it is public api
router.get('/', BlogController.getallBlog);

export const BlogRoutes = router;

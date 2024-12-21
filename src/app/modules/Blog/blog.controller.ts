import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendRequest from '../../utils/sendRequest';
import { BlogServices } from './blog.service';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import sendRequestWithData from '../../utils/sendRequestwithoutmongoosedata';

//create blog with user id
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { useremail } = req.user as JwtPayload;
  const result = await BlogServices.createBlogIntoDB(req.body, useremail);
  sendRequest(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});
//update blog with token and info
const updateSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { useremail } = req.user as JwtPayload;
  const result = await BlogServices.updateSingleBlogIntoDB(
    req.body,
    id,
    useremail
  );
  sendRequest(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

//deleted Blog by user
const deleteSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { useremail } = req.user as JwtPayload;
  await BlogServices.deletedSingleBlogIntoDB(id, useremail);

  sendRequestWithData(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

//get all block for public api
const getallBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getallBlogfromDB(req.query);
  sendRequest(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateSingleBlog,
  deleteSingleBlog,
  getallBlog,
};

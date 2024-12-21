import { Tblog } from './blog.interface';
import User from '../User/user.modul';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import Blog from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';
import mongoose from 'mongoose';




//create Blog into the database
const createBlogIntoDB = async (payload: Partial<Tblog>, useremail: string) => {
  const user = await User.findOne({ email: useremail }).select('_id');
  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'you are an authorised to create blog !'
    );
  }
  payload.author = user._id;
  const result = (await Blog.create(payload)).populate('author');
  return result;
};



//update Blog into the database
const updateSingleBlogIntoDB = async (
  payload: Partial<Tblog>,
  id: string,
  useremail: string
) => {
  if (!id) {
    throw new Error(`Pleace Enter id`);
  }
  const issameuser = await Blog.isOwnUser(useremail, id);

  if (!issameuser) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Your are not authorize user');
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');
  return result;
};
//delete blog by user into the database
const deletedSingleBlogIntoDB = async (id: string, useremail: string) => {
  if (!id) {
    throw new Error(`Pleace Enter id`);
  }

  const issameuser = await Blog.isOwnUser(useremail, id);

  if (!issameuser) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Your are not authorize user');
  }

  const result = await Blog.findByIdAndDelete(id);

  return result;
};



//get all blog from databse
const getallBlogfromDB = async (query: Record<string, unknown>) => {
  const Blogquery = new QueryBuilder(Blog.find().populate('author'), query)
    .search(['title', 'content'])
    .sort();
  let result = await Blogquery.modelQuery;
  if (query?.filter) {
    result = result.filter((item) =>
      item.author._id.equals(
        new mongoose.Types.ObjectId(query?.filter as string)
      )
    );
  }

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateSingleBlogIntoDB,
  deletedSingleBlogIntoDB,
  getallBlogfromDB,
};

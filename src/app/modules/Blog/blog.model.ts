import { Schema, model } from 'mongoose';
import { BlogModel, Tblog } from './blog.interface';
import { BlogHiddenfelds } from './blog.constant';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

// create blogSchema for blog
const blogSchema = new Schema<Tblog, BlogModel>(
  {
    title: {
      type: String,
      required: [true, 'The title field is required.'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'The content field is required.'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'The author field is required.'],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// is same user access
blogSchema.statics.isOwnUser = async function (email: string, id: string) {
  const user = await this.findById(id)
    .select('author')
    .populate<{ author: { email: string } }>('author', 'email -_id');

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, `Blog with id ${id} not found.`);
  }

  if (user && user.author && user.author.email === email) {
    return true;
  }
  return false;
};

//remove files in res in means  some filed is hidden
blogSchema.set('toJSON', {
  transform: function (doc, ret) {
    BlogHiddenfelds.forEach((field) => {
      delete ret[field];
    });
    return ret;
  },
});

// Create and export the Blog model
const Blog = model<Tblog, BlogModel>('Blog', blogSchema);

export default Blog;

import { Schema, model } from 'mongoose';
import { Tblog } from './blog.interface';
import { BlogHiddenfelds } from './blog.constant';

// create blogSchema for blog
const blogSchema = new Schema<Tblog>(
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
const Blog = model<Tblog>('Blog', blogSchema);

export default Blog;

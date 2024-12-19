import { Types } from 'mongoose';

// create interface for blog
export interface Tblog {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
}

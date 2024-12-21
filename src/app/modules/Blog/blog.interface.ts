/* eslint-disable no-unused-vars */

import { Model, Types } from 'mongoose';

// create interface for blog
export type Tblog = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
};

export interface BlogModel extends Model<Tblog> {
  isOwnUser(email: string, id: string): Promise<boolean>;
}

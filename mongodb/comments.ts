import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  content: String,
  userId: String,
  likesCount: Number, 
  name: String,
  bgimg: String,
});

CommentSchema.add({
  comments: [CommentSchema],
});

export const PostSchema = new mongoose.Schema({
  postId: Number,
  comments: [CommentSchema],
});

export interface CommentDoc extends Document {
  content: string;
  userId: string;
  likesCount?: Number, 
  name: string;
  bgimg?: string;
  comments: CommentDoc[];
}

export interface PostDoc extends Document {
  postId: number;
  comments: CommentDoc[];
}

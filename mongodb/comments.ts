import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  content: String,
  userId: String,
  name: String,
});

CommentSchema.add({
  comments: [CommentSchema],
});

export interface Comment extends Document {
  content: string;
  userId: string;
  name: string;
  comments: Comment[];
}

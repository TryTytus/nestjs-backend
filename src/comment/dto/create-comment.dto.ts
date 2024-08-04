import { CommentDoc } from 'mongodb/comments';
import { IsEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateCommentDto implements Partial<CommentDoc> {

  @IsEmpty()
  _id?: ObjectId;

  @IsString()
  content?: string;

  @IsEmpty()
  userId?: string;

  @IsEmpty()
  name?: string;

  @IsEmpty()
  comments?: CommentDoc[];
}

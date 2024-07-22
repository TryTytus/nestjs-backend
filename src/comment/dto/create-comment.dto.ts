import { CommentDoc } from 'mongodb/comments';
import { IsEmpty, IsString } from 'class-validator';

export class CreateCommentDto implements Partial<CommentDoc> {
  @IsString()
  content?: string;

  @IsString()
  userId?: string;

  @IsString()
  name?: string;

  @IsEmpty()
  comments?: CommentDoc[];
}

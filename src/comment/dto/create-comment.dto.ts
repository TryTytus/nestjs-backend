import { Comment } from 'mongodb/comments';
import { IsEmpty, IsString } from 'class-validator';

export class CreateCommentDto implements Partial<Comment> {
  @IsString()
  content?: string;

  @IsString()
  userId?: string;

  @IsString()
  name?: string;

  @IsEmpty()
  comments?: Comment[];
}

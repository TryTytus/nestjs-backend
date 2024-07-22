import { Inject, Injectable } from '@nestjs/common';
import { Comment } from 'mongodb/comments';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_MODEL')
    private commentModel: Model<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdCat = new this.commentModel(createCommentDto);
    return createdCat.save();
  }
}

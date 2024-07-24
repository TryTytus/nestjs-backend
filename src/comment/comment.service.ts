import { Inject, Injectable } from '@nestjs/common';
import { CommentDoc, PostDoc } from 'mongodb/comments';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';

// interface Comment {
//   content: string;
//   userId: string;
//   name: string;
//   comments: Comment[];
// }

export class Comment {
  @ApiProperty()
  content: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  comments: Comment[];
}

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_MODEL')
    private commentModel: Model<CommentDoc>,
    @Inject('POST_MODEL')
    private postModel: Model<PostDoc>,
  ) {}

  async get(id: number): Promise<Comment[]> {
    return (
      await this.postModel
        .findOne({
          postId: id,
        })
        .exec()
    ).comments;
  }

  async getNested(): Promise<Comment> {
    const _id = '669e65df1fdd5571e92ee1cb';
    // return await this.commentModel.findOne({
    //   _id: _id,
    //   'comments.0.comments.0': 'newName',
    // });
    const path = 'comments.0.comments.0';
    return await this.commentModel.findById(_id).populate(path).exec();
  }

  async create(
    createCommentDto: CreateCommentDto,
    path: string,
    postId: string,
  ) {
    // const createdCat = new this.commentModel(createCommentDto);

    // const _id = '669f94a4a0b50dad62872f8e';

    // const newComment: Comment = {
    //   content: 'New nested comment content',
    //   userId: 'newUserId',
    //   name: 'newName',
    //   comments: [],
    // };

    const updateQuery = {};

    const fullPath = path === '' ? 'comments' : 'comments.' + path;

    updateQuery[fullPath] = createCommentDto;

    const updatedComment = await this.postModel.updateOne(
      { postId },
      { $push: updateQuery },
      { new: true }, // This option returns the updated document
    );

    console.log(updatedComment);

    return createCommentDto;
  }
}

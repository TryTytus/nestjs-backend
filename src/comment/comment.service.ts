import { Inject, Injectable } from '@nestjs/common';
import { CommentDoc, PostDoc } from 'mongodb/comments';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma.service';
import { ObjectId } from 'mongodb';

var _ = require('lodash');

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
    private prisma: PrismaService,
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

  async create(
    createCommentDto: CreateCommentDto,
    path: string,
    postId: string,
  ) {
    createCommentDto._id = new ObjectId();
    const { userId } = createCommentDto;

    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: userId },
    });

    createCommentDto.name = user.name;

    const updateQuery = {};

    const fullPath = path === '' ? 'comments' : 'comments.' + path;

    updateQuery[fullPath] = createCommentDto;

    const updatedComment = await this.postModel.findOneAndUpdate(
      { postId },
      { $push: updateQuery },
      { new: true }, // This option returns the updated document
    );

    console.log(updatedComment);

    await this.prisma.post.update({
      where: { id: Number.parseInt(postId) },
      data: {
        commentsCount: { increment: 1 },
      },
    });

    await this.prisma.commentInfo.create({
      data: {
        id: createCommentDto._id.toString(),
        postId: Number.parseInt(postId),
        userId,
      },
    });

    return createCommentDto;
  }

  async likeComment(postId: string, userId: string, path: string) {
    let fullPath = path === '' ? 'comments' : 'comments.' + path;

    const post = await this.postModel
      .findOne({
        postId,
      })
      .populate({ path: fullPath });


    const nestedId = _.get(post, fullPath.split('.').slice(0, -1))._id;

    fullPath = fullPath.slice(0, -9);
    const likesPath = fullPath + '.likesCount';

    const data = {
      postId: Number.parseInt(postId),
      userId,
      commentInfoId: nestedId.toString(),
    };


    await this.prisma.commentLikes.create({
      data
    });

    const updatedComment = await this.postModel.findOneAndUpdate(
      { postId },
      { $inc: { [likesPath]: 1 } },
      { new: true }, // This option returns the updated document
    );

    if (!updatedComment) {
      throw new Error('Comment not found');
    }


    return updatedComment;
  }

  async dislikeComment(postId: string, userId: string, path: string) {
    let fullPath = path === '' ? 'comments' : 'comments.' + path;

    const post = await this.postModel
      .findOne({
        postId,
      })
      .populate({ path: fullPath });


    const nestedId = _.get(post, fullPath.split('.').slice(0, -1))._id;

    fullPath = fullPath.slice(0, -9);
    const likesPath = fullPath + '.likesCount';

    const data = {
      postId: Number.parseInt(postId),
      userId,
      commentInfoId: nestedId.toString(),
    };


    await this.prisma.commentLikes.delete({
      where: {
         commentInfoId_postId_userId: data
      }
    });

    const updatedComment = await this.postModel.findOneAndUpdate(
      { postId },
      { $inc: { [likesPath]: -1 } },
      { new: true },
    );

    if (!updatedComment) {
      throw new Error('Comment not found');
    }


    return updatedComment;
  }




}

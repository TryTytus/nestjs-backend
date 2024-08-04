import { Injectable } from '@nestjs/common';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentLikesService {
  constructor(private prisma: PrismaService) {}

  async create(postId: number, userId: string) {
    return `This action creates commentLikes`
  }

  async getCommentLikes(userId: string) {
    return await this.prisma.commentLikes.findMany({
      where: {
        userId
      }
    })
   }
  findOne(id: number) {
    return `This action returns a #${id} commentLike`;
  }

  update(id: number, updateCommentLikeDto: UpdateCommentLikeDto) {
    return `This action updates a #${id} commentLike`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentLike`;
  }
}

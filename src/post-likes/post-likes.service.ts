import { Injectable } from '@nestjs/common';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UpdatePostLikeDto } from './dto/update-post-like.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostLikesService {
  constructor(private prisma: PrismaService) {}

  async like(postId: number, userId: string) {
    const like = await this.prisma.postLikes.create({
      data: {
        postId,
        userId,
      },
    });

    await this.prisma.post.update({
      where: { id: postId },
      data: { likesCount: { increment: 1 } },
    });

    return like;
  }

  async dislike(postId: number, userId: string) {
    const like = await this.prisma.postLikes.delete({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    await this.prisma.post.update({
      where: { id: postId },
      data: { likesCount: { decrement: 1 } },
    });
    
    return like;
  }
}

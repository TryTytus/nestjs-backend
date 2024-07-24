import { Inject, Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Model } from 'mongoose';
import { PostDoc } from 'mongodb/comments';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    @Inject('POST_MODEL') private postModel: Model<PostDoc>,
  ) {}

   async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = await this.prisma.post.create({
      data: createPostDto,
    });
    await this.postModel.create({ postId: post.id });
    return post;
  }

  async findAll(skip: number, take: number): Promise<Post[]> {
    return await this.prisma.post.findMany({
      include: {
        user: true,
      },
      skip,
      take,
    });
  }

  async findOne(id: number): Promise<Post> {
    return await this.prisma.post.findFirstOrThrow({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async update(
    id: number,
    updatePostDto: Prisma.PostUpdateInput,
  ): Promise<Post> {
    return await this.prisma.post.update({
      data: updatePostDto,
      where: { id },
    });
  }

  async remove(id: number): Promise<Post> {
    return await this.prisma.post.delete({
      where: { id },
    });
  }

  // async belongsTo(id: number, userId: string): boolean {
  //   const post = await this.prisma.post.findFirst()
  // }
}

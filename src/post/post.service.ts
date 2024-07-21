import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return await this.prisma.post.create({
      data: createPostDto,
    });
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

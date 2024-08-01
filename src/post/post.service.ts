import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Model } from 'mongoose';
import { PostDoc } from 'mongodb/comments';
import { SearchService } from 'src/search.service';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    @Inject('POST_MODEL') private postModel: Model<PostDoc>,
    private search: SearchService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = await this.prisma.post.create({
      data: createPostDto,
    });
    await this.postModel.create({ postId: post.id });
    this.search.posts.addDocuments([{ id: post.id, content: post.content }]);

    return post;
  }

  async findAll(skip: number, take: number, userId?: string): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        user: true,
      },
      skip,
      take,
    });

    if (userId === undefined) return posts;

    // Step 2: Fetch all PostLikes for the given user
    const likedPosts = await this.prisma.postLikes.findMany({
      where: { userId },
      select: { postId: true },
    });

    const likedPostsIds = new Set(likedPosts.map((like) => like.postId));

    const postsWithIsLiked = posts.map((post) => ({
      ...post,
      isLiked: likedPostsIds.has(post.id),
    }));

    return postsWithIsLiked;
  }

  async findOne(id: number, userId?: string): Promise<Post> {
    const post = await this.prisma.post.findFirstOrThrow({
      where: { id },
      include: {
        user: true,
      },
    });

    if (userId === undefined) return post;

    const isLiked =
      null !==
      (await this.prisma.postLikes.findFirst({
        where: { userId, postId: id },
      }));

    return { ...post, isLiked };
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
    const post = await this.prisma.post.delete({
      where: { id },
    });

    await this.postModel.deleteOne({ postId: post.id });
    await this.search.posts.deleteDocument(post.id);

    return post;
  }

  async addPostToSerchable() {
    const documents = [
      {
        id: 1,
        content: 'Bajo jajo',
      },
    ];

    let res = await this.search.posts.addDocuments(documents);

    console.log(res); // => { "uid": 0 }
  }

  // async belongsTo(id: number, userId: string): boolean {
  //   const post = await this.prisma.post.findFirst()
  // }
}

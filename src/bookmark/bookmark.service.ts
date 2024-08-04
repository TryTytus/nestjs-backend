import { Injectable } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { Post } from 'src/post/entities/post.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookmarkService {

  constructor(private prisma: PrismaService) {}

  async create(postId: number, userId: string): Promise<Bookmark> {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        postId,
        userId,
      },
    });

    return bookmark;
  }

  async findAll(skip: number, take: number, userId: string): Promise<Post[]> {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId }
    })

    const postBookmarkIds = bookmarks.map(bookmark => bookmark.postId);
    const posts = await this.prisma.post.findMany({
      where: { id: {in: postBookmarkIds } },
      include: {
        user: true,
      },
      skip,
      take,
    });

    const postIds = posts.map((post) => post.id);
    await this.prisma.post.updateMany({
      where: {
        id: {
          in: postIds,
        },
      },
      data: {
        viewsCont: { increment: 1 },
      },
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
      isBookmarked: true,
    }));

    return postsWithIsLiked;
  }

  async remove(postId: number, userId: string): Promise<Bookmark> {
    const bookmark = await this.prisma.bookmark.delete({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
    
    return bookmark;
  }
}

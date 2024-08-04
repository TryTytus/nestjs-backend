import { Bookmark } from '@prisma/client';
import { Post } from 'src/post/entities/post.entity';
import { PrismaService } from 'src/prisma.service';
export declare class BookmarkService {
    private prisma;
    constructor(prisma: PrismaService);
    create(postId: number, userId: string): Promise<Bookmark>;
    findAll(skip: number, take: number, userId: string): Promise<Post[]>;
    remove(postId: number, userId: string): Promise<Bookmark>;
}

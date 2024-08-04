import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Model } from 'mongoose';
import { PostDoc } from 'mongodb/comments';
import { SearchService } from 'src/search.service';
import { Post } from './entities/post.entity';
export declare class PostService {
    private prisma;
    private postModel;
    private search;
    constructor(prisma: PrismaService, postModel: Model<PostDoc>, search: SearchService);
    create(createPostDto: CreatePostDto): Promise<Post>;
    findAll(skip: number, take: number, userId: string, orderBy: string, order: string): Promise<Post[]>;
    findOne(id: number, userId?: string): Promise<Post>;
    update(id: number, updatePostDto: Prisma.PostUpdateInput): Promise<Post>;
    remove(id: number): Promise<Post>;
    addPostToSerchable(): Promise<void>;
}

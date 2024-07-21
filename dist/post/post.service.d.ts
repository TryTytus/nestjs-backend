import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPostDto: CreatePostDto): Promise<Post>;
    findAll(skip: number, take: number): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    update(id: number, updatePostDto: Prisma.PostUpdateInput): Promise<Post>;
    remove(id: number): Promise<Post>;
}

import { PrismaService } from 'src/prisma.service';
export declare class PostLikesService {
    private prisma;
    constructor(prisma: PrismaService);
    like(postId: number, userId: string): Promise<{
        postId: number;
        userId: string;
    }>;
    dislike(postId: number, userId: string): Promise<{
        postId: number;
        userId: string;
    }>;
}

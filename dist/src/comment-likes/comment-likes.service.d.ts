import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';
import { PrismaService } from 'src/prisma.service';
export declare class CommentLikesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(postId: number, userId: string): Promise<string>;
    getCommentLikes(userId: string): Promise<{
        commentInfoId: string;
        postId: number;
        userId: string;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateCommentLikeDto: UpdateCommentLikeDto): string;
    remove(id: number): string;
}

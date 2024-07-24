import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';
import { PrismaService } from 'src/prisma.service';
export declare class CommentLikesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(postId: number, userId: string): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCommentLikeDto: UpdateCommentLikeDto): string;
    remove(id: number): string;
}

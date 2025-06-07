import { CommentDoc, PostDoc } from 'mongodb/comments';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma.service';
export declare class Comment {
    content: string;
    userId: string;
    name: string;
    bgimg?: string;
    comments: Comment[];
}
export declare class CommentService {
    private commentModel;
    private postModel;
    private prisma;
    constructor(commentModel: Model<CommentDoc>, postModel: Model<PostDoc>, prisma: PrismaService);
    get(id: number): Promise<Comment[]>;
    create(createCommentDto: CreateCommentDto, path: string, postId: string): Promise<CreateCommentDto>;
    likeComment(postId: string, userId: string, path: string): Promise<import("mongoose").Document<unknown, {}, PostDoc> & PostDoc & Required<{
        _id: unknown;
    }>>;
    dislikeComment(postId: string, userId: string, path: string): Promise<import("mongoose").Document<unknown, {}, PostDoc> & PostDoc & Required<{
        _id: unknown;
    }>>;
}

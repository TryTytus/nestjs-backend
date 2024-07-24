import { CommentDoc, PostDoc } from 'mongodb/comments';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class Comment {
    content: string;
    userId: string;
    name: string;
    comments: Comment[];
}
export declare class CommentService {
    private commentModel;
    private postModel;
    constructor(commentModel: Model<CommentDoc>, postModel: Model<PostDoc>);
    get(id: number): Promise<Comment[]>;
    getNested(): Promise<Comment>;
    create(createCommentDto: CreateCommentDto, path: string, postId: string): Promise<CreateCommentDto>;
}

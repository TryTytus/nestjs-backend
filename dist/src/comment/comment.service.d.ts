import { CommentDoc } from 'mongodb/comments';
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
    constructor(commentModel: Model<CommentDoc>);
    get(): Promise<Comment>;
    getNested(): Promise<Comment>;
    create(createCommentDto: CreateCommentDto, path: string): Promise<CreateCommentDto>;
}

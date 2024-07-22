import { Comment } from 'mongodb/comments';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentService {
    private commentModel;
    constructor(commentModel: Model<Comment>);
    create(createCommentDto: CreateCommentDto): Promise<Comment>;
}

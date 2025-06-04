import { CommentDoc } from 'mongodb/comments';
import { ObjectId } from 'mongodb';
export declare class CreateCommentDto implements Partial<CommentDoc> {
    _id?: ObjectId;
    content?: string;
    userId?: string;
    name?: string;
    bgimg?: string;
    comments?: CommentDoc[];
}

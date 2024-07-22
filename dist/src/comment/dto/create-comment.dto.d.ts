import { CommentDoc } from 'mongodb/comments';
export declare class CreateCommentDto implements Partial<CommentDoc> {
    content?: string;
    userId?: string;
    name?: string;
    comments?: CommentDoc[];
}

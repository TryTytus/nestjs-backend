import { Comment } from 'mongodb/comments';
export declare class CreateCommentDto implements Partial<Comment> {
    content?: string;
    userId?: string;
    name?: string;
    comments?: Comment[];
}

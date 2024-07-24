import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SessionContainer } from 'supertokens-node/recipe/session';
export declare class Comment {
    content: string;
    userId: string;
    name: string;
    comments: Comment[];
}
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    get(id: string): Promise<Comment[]>;
    getNested(): Promise<Comment>;
    create(createCommentDto: CreateCommentDto, path: string, postId: string, session: SessionContainer): Promise<CreateCommentDto>;
}

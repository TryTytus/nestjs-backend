import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class Comment {
    content: string;
    userId: string;
    name: string;
    comments: Comment[];
}
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    get(): Promise<Comment[]>;
    getNested(): Promise<Comment>;
    create(CreateCommentDto: CreateCommentDto, path: string): Promise<CreateCommentDto>;
}

import { CommentLikesService } from './comment-likes.service';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';
import { SessionContainer } from 'supertokens-node/recipe/session';
export declare class CommentLikesController {
    private readonly commentLikesService;
    constructor(commentLikesService: CommentLikesService);
    create(postId: string, session: SessionContainer): Promise<void>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCommentLikeDto: UpdateCommentLikeDto): string;
    remove(id: string): string;
}

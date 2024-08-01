import { PostLikesService } from './post-likes.service';
import { SessionContainer } from 'supertokens-node/recipe/session';
export declare class PostLikesController {
    private readonly postLikesService;
    constructor(postLikesService: PostLikesService);
    like(postId: string, session: SessionContainer): Promise<{
        postId: number;
        userId: string;
    }>;
    dislike(postId: string, session: SessionContainer): Promise<{
        postId: number;
        userId: string;
    }>;
}

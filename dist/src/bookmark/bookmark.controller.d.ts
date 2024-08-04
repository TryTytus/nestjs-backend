import { BookmarkService } from './bookmark.service';
import { SessionContainer } from 'supertokens-node/recipe/session';
export declare class BookmarkController {
    private readonly bookmarkService;
    constructor(bookmarkService: BookmarkService);
    create(postId: string, session: SessionContainer): Promise<{
        postId: number;
        userId: string;
    }>;
    findAll(skip?: string, take?: string, session?: SessionContainer): Promise<import("../post/entities/post.entity").Post[]>;
    remove(postId: string, session: SessionContainer): Promise<{
        postId: number;
        userId: string;
    }>;
}

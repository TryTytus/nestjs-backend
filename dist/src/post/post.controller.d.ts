import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, session: SessionContainer): Promise<import("./entities/post.entity").Post>;
    findAll(skip?: string, take?: string, orderBy?: string, order?: 'desc' | 'asc', session?: SessionContainer): Promise<import("./entities/post.entity").Post[]>;
    findOne(id: string, session?: SessionContainer): Promise<import("./entities/post.entity").Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("./entities/post.entity").Post>;
    remove(id: string): Promise<import("./entities/post.entity").Post>;
    addIndex(): Promise<void>;
}

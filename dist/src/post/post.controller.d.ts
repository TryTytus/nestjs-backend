import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, session: SessionContainer): Promise<{
        id: number;
        content: string;
        likesCount: number;
        viewsCont: number;
        commentsCount: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findAll(skip?: number, take?: number): Promise<{
        id: number;
        content: string;
        likesCount: number;
        viewsCont: number;
        commentsCount: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        content: string;
        likesCount: number;
        viewsCont: number;
        commentsCount: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<{
        id: number;
        content: string;
        likesCount: number;
        viewsCont: number;
        commentsCount: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        content: string;
        likesCount: number;
        viewsCont: number;
        commentsCount: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}

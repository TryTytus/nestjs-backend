import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { FileUpload } from './dto/file-upload.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, session: SessionContainer): Promise<{
        id: string;
        name: string;
        nickname: string;
        createdAt: Date;
        bio: string | null;
        avatar: string | null;
        bgimg: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        nickname: string;
        createdAt: Date;
        bio: string | null;
        avatar: string | null;
        bgimg: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        nickname: string;
        createdAt: Date;
        bio: string | null;
        avatar: string | null;
        bgimg: string | null;
    }>;
    findByNickname(nickname: string): Promise<{
        id: string;
        name: string;
        nickname: string;
        createdAt: Date;
        bio: string | null;
        avatar: string | null;
        bgimg: string | null;
    }>;
    update(updateUserDto: UpdateUserDto, session: SessionContainer): Promise<{
        id: string;
        name: string;
        nickname: string;
        createdAt: Date;
        bio: string | null;
        avatar: string | null;
        bgimg: string | null;
    }>;
    remove(session: SessionContainer): Promise<{
        id: string;
        name: string;
        nickname: string;
        createdAt: Date;
        bio: string | null;
        avatar: string | null;
        bgimg: string | null;
    }>;
    uploadFile(file: Express.Multer.File): string;
    updateProfile(files: FileUpload, bio: string, session: SessionContainer): Promise<{
        id: string;
        name: string;
        nickname: string;
        createdAt: Date;
        bio: string | null;
        avatar: string | null;
        bgimg: string | null;
    }>;
}

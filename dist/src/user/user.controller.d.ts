import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SessionContainer } from 'supertokens-node/recipe/session';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, session: SessionContainer): Promise<{
        id: string;
        name: string;
        nickname: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        nickname: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        nickname: string;
        createdAt: Date;
    }>;
    update(updateUserDto: UpdateUserDto, session: SessionContainer): Promise<{
        id: string;
        name: string;
        nickname: string;
        createdAt: Date;
    }>;
    remove(session: SessionContainer): Promise<{
        id: string;
        name: string;
        nickname: string;
        createdAt: Date;
    }>;
}

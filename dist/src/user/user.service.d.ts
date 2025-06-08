import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';
import { SearchService } from 'src/search.service';
import { Post } from '@prisma/client';
export declare class UserService {
    private prisma;
    private search;
    constructor(prisma: PrismaService, search: SearchService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByNickname(nickname: string): Promise<User | null>;
    findUserPosts(nickname: string): Promise<Post[]>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
    fileUpload(userId: string, avatar: string, bgImg: string, bio: string): Promise<User>;
    sync(): Promise<void>;
}

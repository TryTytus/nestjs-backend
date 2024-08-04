import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';
import { SearchService } from 'src/search.service';
export declare class UserService {
    private prisma;
    private search;
    constructor(prisma: PrismaService, search: SearchService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<User>;
    fileUpload(userId: string, avatar: string, bgImg: string, bio: string): Promise<User>;
    sync(): Promise<void>;
}

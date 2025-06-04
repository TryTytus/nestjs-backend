import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from './entities/user.entity';
import {
  PostSearchable,
  SearchService,
  UserSearchable,
} from 'src/search.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private search: SearchService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    await this.search.users.addDocuments([
      { id: user.id, name: user.name, nickname: user.nickname },
    ]);

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findByNickname(nickname: string): Promise<User | null> {
    return await this.prisma.user.findFirstOrThrow({ where: { nickname } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async remove(id: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    await this.search.users.deleteDocument(id);

    return user;
  }

  async fileUpload(userId: string, avatar: string, bgImg: string, bio: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        avatar,
        bgimg: bgImg,
        bio,
      },
    });
  }

  async sync() {
    // const users = (await this.prisma.user.findMany()).map(
    //   (user) => ({ ...user }) as UserSearchable,
    // );

    const posts = (await this.prisma.post.findMany()).map(
      (post) => ({ ...post }) as PostSearchable,
    );

    // await this.search.users.addDocuments(users);
    await this.search.posts.addDocuments(posts);
  }
}

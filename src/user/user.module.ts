import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { SearchService } from 'src/search.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, SearchService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { PostLikesService } from './post-likes.service';
import { PostLikesController } from './post-likes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PostLikesController],
  providers: [PostLikesService, PrismaService],
})
export class PostLikesModule {}

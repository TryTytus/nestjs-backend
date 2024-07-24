import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CommentLikesController } from './comment-likes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CommentLikesController],
  providers: [CommentLikesService, PrismaService],
})
export class CommentLikesModule {}

import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongoDbModule } from 'mongodb/mongodb.module';
import { commentProviders } from './comment.provider';

@Module({
  imports: [MongoDbModule],
  controllers: [CommentController],
  providers: [CommentService, ...commentProviders],
})
export class CommentModule {}

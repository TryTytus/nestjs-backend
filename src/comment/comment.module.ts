import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongoDbModule } from 'mongodb/mongodb.module';
import { commentProviders } from './comment.provider';
import { postProviders } from 'src/post/post.provider';

@Module({
  imports: [MongoDbModule],
  controllers: [CommentController],
  providers: [CommentService, ...commentProviders, ...postProviders],
})
export class CommentModule {}

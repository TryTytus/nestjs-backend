import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { postProviders } from './post.provider';
import { MongoDbModule } from 'mongodb/mongodb.module';
import { SearchService } from 'src/search.service';

@Module({
  imports: [MongoDbModule],
  controllers: [PostController],
  providers: [PostService, PrismaService, ...postProviders, SearchService],
})
export class PostModule {}

// ...
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { CommentLikesModule } from './comment-likes/comment-likes.module';
import { EventsGateway } from './events/events.gateway';
import { SearchService } from './search.service';
import { PostLikesModule } from './post-likes/post-likes.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    AuthModule.forRoot({
      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: 'http://localhost:3567',
      // apiKey: <API_KEY(if configured)>,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: 'twitter',
        apiDomain: 'http://localhost:3000',
        websiteDomain: 'http://localhost:5173',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
    UserModule,
    PostModule,
    CommentModule,
    CommentLikesModule,
    PostLikesModule,
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, EventsGateway, SearchService],
})
export class AppModule {}

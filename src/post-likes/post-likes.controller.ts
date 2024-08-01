import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostLikesService } from './post-likes.service';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UpdatePostLikeDto } from './dto/update-post-like.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'src/auth/session/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';


@Controller('post-likes')
@ApiTags('post-likes')
export class PostLikesController {
  constructor(private readonly postLikesService: PostLikesService) {}

  @Post('like/:postId')
  @UseGuards(new AuthGuard())
  like(@Param('postId') postId: string, @Session() session: SessionContainer) {
    const userId = session.getUserId();
    return this.postLikesService.like(+postId, userId);
  }

  @Post('dislike/:postId')
  @UseGuards(new AuthGuard())
  dislike(@Param('postId') postId: string, @Session() session: SessionContainer) {
    const userId = session.getUserId();
    return this.postLikesService.dislike(+postId, userId);
  }
}

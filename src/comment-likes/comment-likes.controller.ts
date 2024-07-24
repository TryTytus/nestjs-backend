import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'src/auth/session/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';

@Controller('comment-likes')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @Post(':postId')
  @UseGuards(new AuthGuard())
  create(@Param('postId') postId: string, @Session() session: SessionContainer) {
    const userId = session.getUserId();
    return this.commentLikesService.create(+postId, userId);
  }

  @Get()
  findAll() {
    return this.commentLikesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentLikesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentLikeDto: UpdateCommentLikeDto) {
    return this.commentLikesService.update(+id, updateCommentLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentLikesService.remove(+id);
  }
}

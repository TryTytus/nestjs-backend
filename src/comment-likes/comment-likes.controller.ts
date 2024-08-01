import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Render,
} from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'src/auth/session/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ApiTags } from '@nestjs/swagger';



@Controller('comment-likes')
@ApiTags('comment-likes')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @Post(':postId')
  @UseGuards(new AuthGuard())
  create(
    @Param('postId') postId: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return this.commentLikesService.create(+postId, userId);
  }

  @Get()
  @Render('index')
  findAll() {
    return { message: 'Hello world!' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentLikesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentLikeDto: UpdateCommentLikeDto,
  ) {
    return this.commentLikesService.update(+id, updateCommentLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentLikesService.remove(+id);
  }
}

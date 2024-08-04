import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';

import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { Session } from 'src/auth/session/session.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('bookmark')
@ApiTags('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post(':postId')
  @UseGuards(new AuthGuard())
  create(@Param('postId') postId: string, @Session() session: SessionContainer) {
    const userId = session.getUserId();
    return this.bookmarkService.create(+postId, userId);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  findAll(
    @Query('skip') skip = '0',
    @Query('take') take = '15',
    @Session() session?: SessionContainer,
  ) {
    let userId;
    if (session !== undefined) userId = session.getUserId();
    return this.bookmarkService.findAll(+skip, +take, userId);
  }

  @Delete(':postId')
  @UseGuards(new AuthGuard())
  remove(@Param('postId') postId: string, @Session() session: SessionContainer) {
    const userId = session.getUserId();
    return this.bookmarkService.remove(+postId, userId);
  }
}

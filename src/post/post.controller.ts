import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { UpdatePostDto } from './dto/update-post.dto';
import { Session } from 'src/auth/session/session.decorator';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(new AuthGuard())
  async create(
    @Body() createPostDto: CreatePostDto,
    @Session() session: SessionContainer,
  ) {
    createPostDto.userId = session.getUserId();
    return await this.postService.create(createPostDto);
  }


  @Get()
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @ApiQuery({name: 'orderBy', required: false,  type: String})
  @ApiQuery({name: 'order', required: false,  type: String})
  findAll(
    @Query('skip') skip = '0',
    @Query('take') take = '15',
    @Query('orderBy') orderBy = 'createdAt',
    @Query('order') order: 'desc' | 'asc' = 'desc',
    @Session() session?: SessionContainer,
  ) {
    let userId;
    if (session !== undefined) userId = session.getUserId();
    return this.postService.findAll(+skip, +take, userId, orderBy, order);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  findOne(@Param('id') id: string, @Session() session?: SessionContainer) {
    let userId;
    if (session !== undefined) userId = session.getUserId();
    return this.postService.findOne(+id, userId);
  }

  @Patch(':id')
  @UseGuards(new AuthGuard())
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  // @UseGuards(new AuthGuard())
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  @Get('addIndex')
  async addIndex() {
    return await this.postService.addPostToSerchable();
  }
}

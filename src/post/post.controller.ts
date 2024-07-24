import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Session,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { UpdatePostDto } from './dto/update-post.dto';

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
    console.log(JSON.stringify(createPostDto));
    return await this.postService.create(createPostDto);
  }

  @Get()
  findAll(@Query('skip') skip = 0, @Query('take') take = 15) {
    return this.postService.findAll(skip, take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(new AuthGuard())
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}

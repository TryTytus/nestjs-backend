import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Session,
  Param,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';

// interface Comment {
//   content: string;
//   userId: string;
//   name: string;
//   comments: Comment[];
// }

export class Comment {
  @ApiProperty()
  content: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [Comment] })
  comments: Comment[];
}

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get comments', type: [Comment] })
  async get(@Param('id') id: string): Promise<Comment[]> {
    return await this.commentService.get(+id);
  }

  @Get('/nested')
  async getNested(): Promise<Comment> {
    return this.commentService.getNested();
  }

  @Post()
  @UseGuards(new AuthGuard())
  @ApiQuery({ name: 'path', required: false, type: String })
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Query('path') path: string = '',
    @Query('postId') postId: string,
    @Session() session: SessionContainer,
  ) {
    createCommentDto.userId = session.getUserId();
    return this.commentService.create(createCommentDto, path, postId);
  }
}

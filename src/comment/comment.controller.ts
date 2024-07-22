import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';

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

  @Get()
  @ApiResponse({ status: 200, description: 'Get comments', type: [Comment] })
  async get(): Promise<Comment[]> {
    return [await this.commentService.get()];
  }

  @Get('/nested')
  async getNested(): Promise<Comment> {
    return this.commentService.getNested();
  }

  @Post('/create')
  create(
    @Body() CreateCommentDto: CreateCommentDto,
    @Query('path') path: string,
  ) {
    return this.commentService.create(CreateCommentDto, path);
  }
}

// import { PartialType } from '@nestjs/mapped-types';
// import { CreatePostDto } from './create-post.dto';

import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmpty, IsString, Length } from 'class-validator';

// export class UpdatePostDto extends PartialType(CreatePostDto) {}

export class UpdatePostDto implements Partial<Prisma.PostCreateInput> {
  @IsEmpty()
  id: number;

  @IsString()
  @Length(1, 280)
  @ApiProperty()
  content: string;

  @IsEmpty()
  userId: string;

  @IsEmpty()
  likesCount?: number;
  @IsEmpty()
  viewsCont?: number;
  @IsEmpty()
  commentsCount?: number;

  @IsEmpty()
  updatedAt?: string | Date;
  @IsEmpty()
  createdAt?: string | Date;
}

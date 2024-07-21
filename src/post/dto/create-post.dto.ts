// import { Prisma } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmpty, IsString, Length } from 'class-validator';

// export type CreatePostDto = {};

export class CreatePostDto implements Partial<Prisma.PostCreateInput> {
  @IsEmpty()
  @ApiProperty()
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

  //   @IsEmpty()
  //   user?: Prisma.UserCreateNestedOneWithoutPostsInput;
}

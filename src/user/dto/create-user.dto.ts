import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmpty, IsOptional, IsString, Length } from 'class-validator';

// export type CreateUserDto = Prisma.UserCreateInput;

export class CreateUserDto implements Partial<Prisma.UserCreateInput> {
  @IsEmpty()
  id: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  @ApiProperty()
  nickname: string;

  @IsEmpty()
  createdAt: string | Date;

  @IsEmpty()
  posts?: Prisma.PostCreateNestedManyWithoutUserInput;
}

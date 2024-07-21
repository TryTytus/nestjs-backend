// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';
import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional, IsString, Length } from 'class-validator';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}

// export type UpdateUserDto = Prisma.UserUpdateInput;

export class UpdateUserDto implements Partial<Prisma.UserCreateInput> {
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

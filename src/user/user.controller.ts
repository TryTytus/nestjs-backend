

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'src/auth/session/session.decorator';
// import { SessionRequest } from 'supertokens-node/framework/express';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { join } from 'path';
import { storage } from 'src/storage';
import { FileUpload } from './dto/file-upload.dto';

// import { Session } from 'inspector';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  create(
    @Body() createUserDto: CreateUserDto,
    @Session() session: SessionContainer,
  ) {
    createUserDto.id = session.getUserId();
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('posts/:nickname')
  findUserPosts(@Param('nickname') userId: string) {
    return this.userService.findUserPosts(userId);
  }

  @Get('byId/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get('byNickname/:nickname')
  findByNickname(@Param('nickname') nickname: string) {
    return this.userService.findByNickname(nickname);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return this.userService.update(userId, updateUserDto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  remove(@Session() session: SessionContainer) {
    const userId = session.getUserId();
    return this.userService.remove(userId);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, callback) => {
          callback(
            null,
            `${Date.now()}-${Math.round(Math.random() * 1e9)}.${file.originalname.split('.').pop()}`,
          );
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return 'file uploaded';
  }

  @Post('updateProfile')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'bgImg', maxCount: 1 },
      ],
      storage,
    ),
  )
  async updateProfile(
    @UploadedFiles()
    files: FileUpload,
    @Body('bio') bio: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();

    return this.userService.fileUpload(
      userId,
      files.avatar[0].filename,
      files.bgImg[0].filename,
      bio,
    );
  }


  @Get('sync')
  async sync() {
    return this.userService.sync();
  }

}

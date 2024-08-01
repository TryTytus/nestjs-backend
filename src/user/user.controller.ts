import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Session } from 'src/auth/session/session.decorator';
// import { SessionRequest } from 'supertokens-node/framework/express';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
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

  // @Get('sync')
  // sync() {
  //   return this.userService.sync();
  // }
}

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
  Req,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FindAllUsersQueryDto } from './dto/query-user.dto';
import { getUserDto } from './dto';
import { CustomerRequest } from 'src/interface/global';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Registrar usuarios' })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  getUser(@Req() request: CustomerRequest) {
    const getUserDTo: getUserDto = {
      userId: +request.userId,
    };
    return this.userService.getUser(getUserDTo);
  }

  @Get('find')
  @UseGuards(AuthGuard)
  findAll(@Query() findAllDto: FindAllUsersQueryDto) {
    return this.userService.findAll(findAllDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

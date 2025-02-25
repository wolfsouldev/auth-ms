import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ServerToServerService } from './server-to-server.service';
import { OriginValidatorGuard } from 'src/common/guards/origin-validator.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Servidores')
@Controller('server-to-server')
export class ServerToServerController {
  constructor(private readonly serverToServerService: ServerToServerService) {}

  @Post('token')
  @UseGuards(new OriginValidatorGuard(['Tecopos-Server', 'Tecopay-Server']))
  isTokenValidServer(@Body('token') token: string) {
    return this.serverToServerService.isTokeValid({ token });
  }

  @Post('email')
  checkEmail(@Body('email') email: string) {
    return this.serverToServerService.checkEmail(email);
  }
  @UseGuards(new OriginValidatorGuard(['Tecopos-Server', 'Tecopay-Server']))
  @Get('user/:id')
  getUserByServer(@Param('id', ParseIntPipe) id: number) {
    return this.serverToServerService.getUser(id);
  }

  @Get('getAllUserByServer')
  getAllUserByServer() {}
}

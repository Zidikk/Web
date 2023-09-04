import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Render('login')
  @Get('/login')
  getRoot() {
    return;
  }

  @ApiOperation({
    summary: 'Authorization',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully authorization',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden authorization',
  })
  @Redirect()
  @Post('/login')
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(dto, response);
    return { url: `https://is-web-y24-zidikk.onrender.com/user/${user.email}` };
  }

  @Render('registration')
  @Get('/registration')
  getRegistrationPage() {
    return;
  }

  @ApiOperation({
    summary: 'Registration',
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully registration',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden registration',
  })
  @Redirect('/login')
  @Post('/registration')
  regist(@Body() dto: AuthDto) {
    return this.userService.createUser(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('check')
  Hola() {
    return 'Вы успешно зашли';
  }
}

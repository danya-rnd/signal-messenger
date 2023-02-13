import { Controller, Post, UseGuards, Req, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { SignUpDto } from '../dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/sign-in')
  async signIn(
    @Req() req: Request & { user: User },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token, user } = await this.authService.signIn(
      req.user,
    );
    res.cookie('access_token', access_token, { httpOnly: true });
    res.cookie('refresh_token', refresh_token, { httpOnly: true });
    return user;
  }

  @Post('/sign-up')
  signUp(@Body() data: SignUpDto) {
    return this.authService.createUser(data);
  }

  @Post('/logout')
  logout(
    @Req() req: Request & { user: User },
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
  }
}

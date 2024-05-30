import { Controller, Post, UseGuards, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @CurrentUser() user: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    return { userId: user.id, email: user.email, name: `${user.firstName} ${user.lastName}` };
  }

  @Get('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    await this.authService.logout(response);
    return { message: 'Logged out successfully' };
  }
}

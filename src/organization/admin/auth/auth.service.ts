import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(user: any, response: Response) {
    const payload = { userId: user.id, email: user.email};

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get<number>('JWT_EXPIRATION'),
    );   

    const token = this.jwtService.sign(payload);

    response.cookie('Authentication', token, {
      expires,
      httpOnly: true,
    });
  }

}

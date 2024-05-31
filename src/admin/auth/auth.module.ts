import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { AdminModule } from '../admin.module';
import { AdminService } from '../admin.service';
import { PrismaService } from 'src/database/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: `${configService.get('JWT_EXPIRATION')}s` },
      }),
      inject: [ConfigService],
    }),
    AdminModule,
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    ConfigService,
    JwtModule,
    AdminService,
    PrismaService,
    JwtStrategy
  ],
})
export class AuthModule {}

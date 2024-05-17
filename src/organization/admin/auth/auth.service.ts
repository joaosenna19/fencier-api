import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto } from '../dtos/create-admin.dto';
import { AdminService } from '../admin.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private admin: AdminService) {}

  async signUp(tenantId: string, body: CreateAdminDto) {
    const { email, password } = body;
    
    const adminExists = await this.admin.getAdminByEmail(tenantId, email);

    if (adminExists) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await this.admin.createAdmin(tenantId, { ...body, password: hashedPassword });

    return admin;

  }

  async signIn(tenantId: string, email: string, password: string) { 
    const admin = await this.admin.getAdminByEmail(tenantId, email);
    if (!admin) {
      throw new BadRequestException('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    return { admin, message: 'Login successful' };
  }

}

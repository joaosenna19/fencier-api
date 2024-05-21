import { Injectable } from "@nestjs/common";
import { PassportStrategy
 } from "@nestjs/passport";
 import { Strategy } from "passport-local";
 import { AdminService } from "src/organization/admin/admin.service"

 @Injectable()
 export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private adminService: AdminService) {
     super({
       usernameField: 'email',
     });
   }

   async validate(email: string, password: string) {
     return this.adminService.validateAdmin(email, password);
   }
 }
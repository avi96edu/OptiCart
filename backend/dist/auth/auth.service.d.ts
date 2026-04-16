import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private adminService;
    private jwtService;
    constructor(adminService: AdminService, jwtService: JwtService);
    signIn(username: string, pass: string): Promise<any>;
}

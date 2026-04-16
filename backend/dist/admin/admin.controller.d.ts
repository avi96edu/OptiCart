import { AdminService } from './admin.service';
import { CreateAdminDto, PasswordDto, UpdateAdminDto } from './admin.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getHello(): object;
    getSelectedAdmin(username: string, type: string): Promise<any>;
    getBasicAdmin(username: string): Promise<any>;
    getAdminContact(username: string): Promise<any>;
    createAdmin(dto: CreateAdminDto): Promise<any>;
    searchIdByName(text: string): Promise<any>;
    getAll(): Promise<any>;
    getAdminByUsername(username: string): Promise<any>;
    searchByName(text: string): Promise<any>;
    updateAdmin(username: string, dto: UpdateAdminDto): Promise<any>;
    updatePassword(username: string, dto: PasswordDto): Promise<any>;
    updateStatus(username: string, isActive: boolean): Promise<any>;
    deleteAdmin(username: string): Promise<any>;
}

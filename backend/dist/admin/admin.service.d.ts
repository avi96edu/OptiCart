import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { CreateAdminDto, PasswordDto, UpdateAdminDto } from './admin.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AdminService {
    private adminRepository;
    private mailerService;
    constructor(adminRepository: Repository<AdminEntity>, mailerService: MailerService);
    getHello(): object;
    createAdmin(dto: CreateAdminDto): Promise<any>;
    getBasicAdmin(username: string): Promise<any>;
    getSelectedAdmin(username: string, type: string): Promise<any>;
    getAdminContact(username: string): Promise<any>;
    getAll(): Promise<any>;
    findOne(username: string): Promise<AdminEntity | null>;
    getAdminByUsername(username: string): Promise<any>;
    searchByName(text: string): Promise<any>;
    updateAdmin(username: string, dto: UpdateAdminDto): Promise<any>;
    updatePassword(username: string, dto: PasswordDto): Promise<any>;
    updateStatus(username: string, isActive: boolean): Promise<any>;
    deleteAdmin(username: string): Promise<any>;
}

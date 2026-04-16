import { Repository } from 'typeorm';
import { AdminProfileEntity } from './profile.entity';
import { AdminEntity } from '../admin/admin.entity';
import { CreateProfileDto } from './profile.dto';
export declare class ProfileService {
    private profileRepository;
    private adminRepository;
    constructor(profileRepository: Repository<AdminProfileEntity>, adminRepository: Repository<AdminEntity>);
    createProfile(adminId: string, dto: CreateProfileDto): Promise<any>;
    getProfileByAdmin(adminId: string): Promise<any>;
    updateProfile(adminId: string, dto: CreateProfileDto): Promise<any>;
    deleteProfile(adminId: string): Promise<any>;
}

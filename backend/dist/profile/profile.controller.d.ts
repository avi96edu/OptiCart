import { ProfileService } from './profile.service';
import { CreateProfileDto } from './profile.dto';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    createProfile(adminId: string, dto: CreateProfileDto): Promise<any>;
    getProfileByAdmin(adminId: string): Promise<any>;
    updateProfile(adminId: string, dto: CreateProfileDto): Promise<any>;
    deleteProfile(adminId: string): Promise<any>;
}

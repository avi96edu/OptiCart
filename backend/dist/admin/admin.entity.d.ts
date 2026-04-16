import { AdminProfileEntity } from '../profile/profile.entity';
import { ProjectEntity } from '../project/project.entity';
import { SellerEntity } from '../seller/seller.entity';
export declare class AdminEntity {
    id: string;
    username: string;
    fullName: string;
    email: string;
    password: string;
    isActive: boolean | undefined;
    profile: AdminProfileEntity | null;
    projects: ProjectEntity[] | undefined;
    sellers: SellerEntity[] | undefined;
    generateId(): void;
}

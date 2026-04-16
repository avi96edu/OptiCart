import { AdminEntity } from '../admin/admin.entity';
export declare class ProjectEntity {
    id: number;
    title: string;
    budget: number;
    deadline: string;
    admin: AdminEntity;
}

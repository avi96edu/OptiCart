import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { AdminEntity } from '../admin/admin.entity';
import { CreateProjectDto } from './project.dto';
export declare class ProjectService {
    private projectRepository;
    private adminRepository;
    constructor(projectRepository: Repository<ProjectEntity>, adminRepository: Repository<AdminEntity>);
    createProject(adminId: string, dto: CreateProjectDto): Promise<any>;
    getProjectsByAdmin(adminId: string): Promise<any>;
    getProjectById(id: number): Promise<any>;
    updateProject(id: number, dto: CreateProjectDto): Promise<any>;
    deleteProject(id: number): Promise<any>;
}

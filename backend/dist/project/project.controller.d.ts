import { ProjectService } from './project.service';
import { CreateProjectDto } from './project.dto';
export declare class ProjectController {
    private projectService;
    constructor(projectService: ProjectService);
    createProject(adminId: string, dto: CreateProjectDto): Promise<any>;
    getProjectsByAdmin(adminId: string): Promise<any>;
    getProjectById(id: number): Promise<any>;
    updateProject(id: number, dto: CreateProjectDto): Promise<any>;
    deleteProject(id: number): Promise<any>;
}

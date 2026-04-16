"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("./project.entity");
const admin_entity_1 = require("../admin/admin.entity");
let ProjectService = class ProjectService {
    projectRepository;
    adminRepository;
    constructor(projectRepository, adminRepository) {
        this.projectRepository = projectRepository;
        this.adminRepository = adminRepository;
    }
    async createProject(adminId, dto) {
        const admin = await this.adminRepository.findOneBy({ id: adminId });
        if (!admin) {
            throw new common_1.NotFoundException('admin not found');
        }
        const project = this.projectRepository.create(dto);
        project.admin = admin;
        return await this.projectRepository.save(project);
    }
    async getProjectsByAdmin(adminId) {
        return await this.projectRepository.find({
            where: {
                admin: {
                    id: adminId,
                },
            },
            relations: {
                admin: true,
            },
        });
    }
    async getProjectById(id) {
        const project = await this.projectRepository.findOne({
            where: { id: id },
            relations: { admin: true },
        });
        if (!project) {
            throw new common_1.NotFoundException('project not found');
        }
        return project;
    }
    async updateProject(id, dto) {
        const project = await this.projectRepository.findOneBy({ id: id });
        if (!project) {
            throw new common_1.NotFoundException('project not found');
        }
        await this.projectRepository.update(id, dto);
        return {
            message: 'project updated',
        };
    }
    async deleteProject(id) {
        const project = await this.projectRepository.findOneBy({ id: id });
        if (!project) {
            throw new common_1.NotFoundException('project not found');
        }
        await this.projectRepository.delete(id);
        return {
            message: 'project deleted',
        };
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectService);
//# sourceMappingURL=project.service.js.map
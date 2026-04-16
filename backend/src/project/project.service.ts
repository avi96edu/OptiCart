import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { AdminEntity } from '../admin/admin.entity';
import { CreateProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,

    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  async createProject(adminId: string, dto: CreateProjectDto): Promise<any> {
    const admin = await this.adminRepository.findOneBy({ id: adminId });

    if (!admin) {
      throw new NotFoundException('admin not found');
    }

    const project = this.projectRepository.create(dto);
    project.admin = admin;

    return await this.projectRepository.save(project);
  }

  async getProjectsByAdmin(adminId: string): Promise<any> {
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

  async getProjectById(id: number): Promise<any> {
    const project = await this.projectRepository.findOne({
      where: { id: id },
      relations: { admin: true },
    });

    if (!project) {
      throw new NotFoundException('project not found');
    }

    return project;
  }

  async updateProject(id: number, dto: CreateProjectDto): Promise<any> {
    const project = await this.projectRepository.findOneBy({ id: id });

    if (!project) {
      throw new NotFoundException('project not found');
    }

    await this.projectRepository.update(id, dto);

    return {
      message: 'project updated',
    };
  }

  async deleteProject(id: number): Promise<any> {
    const project = await this.projectRepository.findOneBy({ id: id });

    if (!project) {
      throw new NotFoundException('project not found');
    }

    await this.projectRepository.delete(id);

    return {
      message: 'project deleted',
    };
  }
}
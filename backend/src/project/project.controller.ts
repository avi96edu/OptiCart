import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './project.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create/:adminId')
  @UsePipes(new ValidationPipe())
  createProject(
    @Param('adminId') adminId: string,
    @Body() dto: CreateProjectDto,
  ): Promise<any> {
    return this.projectService.createProject(adminId, dto);
  }

  @Get('admin/:adminId')
  getProjectsByAdmin(@Param('adminId') adminId: string): Promise<any> {
    return this.projectService.getProjectsByAdmin(adminId);
  }

  @Get('find/:id')
  getProjectById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.projectService.getProjectById(id);
  }

  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateProjectDto,
  ): Promise<any> {
    return this.projectService.updateProject(id, dto);
  }

  @Delete('delete/:id')
  deleteProject(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.projectService.deleteProject(id);
  }
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectEntity } from './project.entity';
import { AdminEntity } from '../admin/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, AdminEntity])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
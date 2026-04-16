import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AdminProfileEntity } from './profile.entity';
import { AdminEntity } from '../admin/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminProfileEntity, AdminEntity])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminProfileEntity } from './profile.entity';
import { AdminEntity } from '../admin/admin.entity';
import { CreateProfileDto } from './profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(AdminProfileEntity)
    private profileRepository: Repository<AdminProfileEntity>,

    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  async createProfile(adminId: string, dto: CreateProfileDto): Promise<any> {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
      relations: { profile: true },
    });

    if (!admin) {
      throw new NotFoundException('admin not found');
    }

    const profile = this.profileRepository.create(dto);
    profile.admin = admin;

    const savedProfile = await this.profileRepository.save(profile);

    admin.profile = savedProfile;
    await this.adminRepository.save(admin);

    return {
      message: 'profile created',
      data: {
        id: savedProfile.id,
        phone: savedProfile.phone,
        address: savedProfile.address,
        age: savedProfile.age,
        adminId: admin.id,
      },
    };
  }

  async getProfileByAdmin(adminId: string): Promise<any> {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
      relations: { profile: true },
    });

    if (!admin || !admin.profile) {
      throw new NotFoundException('profile not found');
    }

    return {
      id: admin.profile.id,
      phone: admin.profile.phone,
      address: admin.profile.address,
      age: admin.profile.age,
      adminId: admin.id,
    };
  }

  async updateProfile(adminId: string, dto: CreateProfileDto): Promise<any> {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
      relations: { profile: true },
    });

    if (!admin || !admin.profile) {
      throw new NotFoundException('profile not found');
    }

    await this.profileRepository.update(admin.profile.id, dto);

    return {
      message: 'profile updated',
    };
  }

  async deleteProfile(adminId: string): Promise<any> {
  const admin = await this.adminRepository.findOne({
    where: { id: adminId },
    relations: { profile: true },
  });

  if (!admin || !admin.profile) {
    throw new NotFoundException('profile not found');
  }

  const profileId = admin.profile.id;

  // first remove the relation from admin
  admin.profile = null;
  await this.adminRepository.save(admin);

  // then delete the profile
  await this.profileRepository.delete(profileId);

  return {
    message: 'profile deleted',
  };
}
}
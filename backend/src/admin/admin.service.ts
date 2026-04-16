import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { CreateAdminDto, PasswordDto, UpdateAdminDto } from './admin.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AdminService {
  constructor(
  @InjectRepository(AdminEntity)
  private adminRepository: Repository<AdminEntity>,
  private mailerService: MailerService,
) {}

  getHello(): object {
    return { message: 'Admin is here' };
  }

  async createAdmin(dto: CreateAdminDto): Promise<any> {
  const user1 = await this.adminRepository.findOneBy({ username: dto.username });
  if (user1) {
    throw new BadRequestException('username already exists');
  }

  const user2 = await this.adminRepository.findOneBy({ email: dto.email });
  if (user2) {
    throw new BadRequestException('email already exists');
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(dto.password, salt);
  dto.password = hash;

  const admin = this.adminRepository.create(dto);
  const savedAdmin = await this.adminRepository.save(admin);

  try {
    await this.mailerService.sendMail({
      to: savedAdmin.email,
      subject: 'Welcome to Admin Management System',
      text: 'Hello ' + savedAdmin.fullName + ', your admin account has been created successfully.',
    });

    return {
      message: 'admin created and welcome email sent',
      data: savedAdmin,
    };
  } catch (error) {
    console.log('MAIL ERROR:', error);

    return {
      message: 'admin created but email sending failed',
      data: savedAdmin,
    };
  }
}
async getBasicAdmin(username: string): Promise<any> {
  const admin = await this.adminRepository.findOneBy({ username: username });

  if (!admin) {
    throw new NotFoundException('admin not found');
  }

  return {
    username: admin.username,
    fullName: admin.fullName,
  };
}
async getSelectedAdmin(username: string, type: string): Promise<any> {
  const admin = await this.adminRepository.findOneBy({ username: username });

  if (!admin) {
    throw new NotFoundException('admin not found');
  }

  if (type === 'contact') {
    return {
      id: admin.id,
      email: admin.email,
    };
  }

  if (type === 'basic') {
    return {
      username: admin.username,
      fullName: admin.fullName,
    };
  }

  if (type === 'status') {
    return {
      username: admin.username,
      isActive: admin.isActive,
    };
  }
  if (type === 'short') {
    return {
      id: admin.id,
      
      username: admin.username,
    };
  }

  return {
    id: admin.id,
    username: admin.username,
    fullName: admin.fullName,
    email: admin.email,
    isActive: admin.isActive,
  };
}

async getAdminContact(username: string): Promise<any> {
  const admin = await this.adminRepository.findOneBy({ username: username });

  if (!admin) {
    throw new NotFoundException('admin not found');
  }

  return {
    id: admin.id,
    email: admin.email,
  };
}
  async getAll(): Promise<any> {
  const admins = await this.adminRepository.find({
    relations: {
      sellers: true,
    },
  });

  return admins.map((admin) => ({
    id: admin.id,
    username: admin.username,
    fullName: admin.fullName,
    email: admin.email,
    isActive: admin.isActive,
    sellers: admin.sellers?.map((seller) => ({
      id: seller.id,
      sellerName: seller.sellerName,
      shopName: seller.shopName,
      phone: seller.phone,
    })),
  }));
}

  async findOne(username: string): Promise<AdminEntity | null> {
  return await this.adminRepository.findOneBy({ username: username });
}

  async getAdminByUsername(username: string): Promise<any> {
  const admin = await this.adminRepository.findOne({
    where: { username: username },
    relations: {
      sellers: true,
    },
  });

  if (!admin) {
    throw new NotFoundException('admin not found');
  }

  return {
    id: admin.id,
    username: admin.username,
    fullName: admin.fullName,
    email: admin.email,
    isActive: admin.isActive,
    sellers: admin.sellers?.map((seller) => ({
      id: seller.id,
      sellerName: seller.sellerName,
      shopName: seller.shopName,
      phone: seller.phone,
    })),
  };
}

  async searchByName(text: string): Promise<any> {
    return await this.adminRepository.find({
      where: {
        fullName: Like(`%${text}%`),
      },
    });
  }

  async updateAdmin(username: string, dto: UpdateAdminDto): Promise<any> {
    const admin = await this.adminRepository.findOneBy({ username: username });

    if (!admin) {
      throw new NotFoundException('admin not found');
    }

    const sameEmail = await this.adminRepository.findOneBy({ email: dto.email });
    if (sameEmail && sameEmail.username !== username) {
      throw new BadRequestException('email already exists');
    }

    await this.adminRepository.update({ username: username }, dto);

    return {
      message: 'admin updated',
    };
  }

  async updatePassword(username: string, dto: PasswordDto): Promise<any> {
    const admin = await this.adminRepository.findOneBy({ username: username });

    if (!admin) {
      throw new NotFoundException('admin not found');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);

    await this.adminRepository.update(
      { username: username },
      { password: hash },
    );

    return {
      message: 'password updated',
    };
  }

  async updateStatus(username: string, isActive: boolean): Promise<any> {
    const admin = await this.adminRepository.findOneBy({ username: username });

    if (!admin) {
      throw new NotFoundException('admin not found');
    }

    await this.adminRepository.update(
      { username: username },
      { isActive: isActive },
    );

    return {
      message: 'status updated',
    };
  }

  async deleteAdmin(username: string): Promise<any> {
    const admin = await this.adminRepository.findOneBy({ username: username });

    if (!admin) {
      throw new NotFoundException('admin not found');
    }

    await this.adminRepository.delete({ username: username });

    return {
      message: 'admin deleted',
    };
  }
}
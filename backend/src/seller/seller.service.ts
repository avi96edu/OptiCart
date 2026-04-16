import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerEntity } from './seller.entity';
import { AdminEntity } from '../admin/admin.entity';
import { CreateSellerDto } from './seller.dto';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(SellerEntity)
    private sellerRepository: Repository<SellerEntity>,

    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  async createSeller(adminId: string, dto: CreateSellerDto): Promise<any> {
    const admin = await this.adminRepository.findOneBy({ id: adminId });

    if (!admin) {
      throw new NotFoundException('admin not found');
    }

    const seller = this.sellerRepository.create(dto);
    seller.admin = admin;

    const savedSeller = await this.sellerRepository.save(seller);

    return {
      message: 'seller created',
      data: {
        id: savedSeller.id,
        sellerName: savedSeller.sellerName,
        shopName: savedSeller.shopName,
        phone: savedSeller.phone,
        adminId: admin.id,
      },
    };
  }

  async getSellersByAdmin(adminId: string): Promise<any> {
    const sellers = await this.sellerRepository.find({
      where: {
        admin: {
          id: adminId,
        },
      },
      relations: {
        admin: true,
      },
    });

    return sellers.map((seller) => ({
      id: seller.id,
      sellerName: seller.sellerName,
      shopName: seller.shopName,
      phone: seller.phone,
      adminId: seller.admin.id,
    }));
  }

  async getSellerById(id: number): Promise<any> {
    const seller = await this.sellerRepository.findOne({
      where: { id: id },
      relations: {
        admin: true,
      },
    });

    if (!seller) {
      throw new NotFoundException('seller not found');
    }

    return {
      id: seller.id,
      sellerName: seller.sellerName,
      shopName: seller.shopName,
      phone: seller.phone,
      adminId: seller.admin.id,
    };
  }

  async updateSeller(id: number, dto: CreateSellerDto): Promise<any> {
    const seller = await this.sellerRepository.findOneBy({ id: id });

    if (!seller) {
      throw new NotFoundException('seller not found');
    }

    await this.sellerRepository.update(id, dto);

    return {
      message: 'seller updated',
    };
  }

  async deleteSeller(id: number): Promise<any> {
    const seller = await this.sellerRepository.findOneBy({ id: id });

    if (!seller) {
      throw new NotFoundException('seller not found');
    }

    await this.sellerRepository.delete(id);

    return {
      message: 'seller deleted',
    };
  }
}
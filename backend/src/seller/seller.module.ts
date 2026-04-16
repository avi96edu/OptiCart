import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { SellerEntity } from './seller.entity';
import { AdminEntity } from '../admin/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity, AdminEntity])],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
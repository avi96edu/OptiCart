import { Repository } from 'typeorm';
import { SellerEntity } from './seller.entity';
import { AdminEntity } from '../admin/admin.entity';
import { CreateSellerDto } from './seller.dto';
export declare class SellerService {
    private sellerRepository;
    private adminRepository;
    constructor(sellerRepository: Repository<SellerEntity>, adminRepository: Repository<AdminEntity>);
    createSeller(adminId: string, dto: CreateSellerDto): Promise<any>;
    getSellersByAdmin(adminId: string): Promise<any>;
    getSellerById(id: number): Promise<any>;
    updateSeller(id: number, dto: CreateSellerDto): Promise<any>;
    deleteSeller(id: number): Promise<any>;
}

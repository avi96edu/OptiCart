import { SellerService } from './seller.service';
import { CreateSellerDto } from './seller.dto';
export declare class SellerController {
    private sellerService;
    constructor(sellerService: SellerService);
    createSeller(adminId: string, dto: CreateSellerDto): Promise<any>;
    getSellersByAdmin(adminId: string): Promise<any>;
    getSellerById(id: number): Promise<any>;
    updateSeller(id: number, dto: CreateSellerDto): Promise<any>;
    deleteSeller(id: number): Promise<any>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const seller_entity_1 = require("./seller.entity");
const admin_entity_1 = require("../admin/admin.entity");
let SellerService = class SellerService {
    sellerRepository;
    adminRepository;
    constructor(sellerRepository, adminRepository) {
        this.sellerRepository = sellerRepository;
        this.adminRepository = adminRepository;
    }
    async createSeller(adminId, dto) {
        const admin = await this.adminRepository.findOneBy({ id: adminId });
        if (!admin) {
            throw new common_1.NotFoundException('admin not found');
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
    async getSellersByAdmin(adminId) {
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
    async getSellerById(id) {
        const seller = await this.sellerRepository.findOne({
            where: { id: id },
            relations: {
                admin: true,
            },
        });
        if (!seller) {
            throw new common_1.NotFoundException('seller not found');
        }
        return {
            id: seller.id,
            sellerName: seller.sellerName,
            shopName: seller.shopName,
            phone: seller.phone,
            adminId: seller.admin.id,
        };
    }
    async updateSeller(id, dto) {
        const seller = await this.sellerRepository.findOneBy({ id: id });
        if (!seller) {
            throw new common_1.NotFoundException('seller not found');
        }
        await this.sellerRepository.update(id, dto);
        return {
            message: 'seller updated',
        };
    }
    async deleteSeller(id) {
        const seller = await this.sellerRepository.findOneBy({ id: id });
        if (!seller) {
            throw new common_1.NotFoundException('seller not found');
        }
        await this.sellerRepository.delete(id);
        return {
            message: 'seller deleted',
        };
    }
};
exports.SellerService = SellerService;
exports.SellerService = SellerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(seller_entity_1.SellerEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SellerService);
//# sourceMappingURL=seller.service.js.map
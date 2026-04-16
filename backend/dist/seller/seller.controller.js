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
exports.SellerController = void 0;
const common_1 = require("@nestjs/common");
const seller_service_1 = require("./seller.service");
const seller_dto_1 = require("./seller.dto");
const auth_guard_1 = require("../auth/auth.guard");
let SellerController = class SellerController {
    sellerService;
    constructor(sellerService) {
        this.sellerService = sellerService;
    }
    createSeller(adminId, dto) {
        return this.sellerService.createSeller(adminId, dto);
    }
    getSellersByAdmin(adminId) {
        return this.sellerService.getSellersByAdmin(adminId);
    }
    getSellerById(id) {
        return this.sellerService.getSellerById(id);
    }
    updateSeller(id, dto) {
        return this.sellerService.updateSeller(id, dto);
    }
    deleteSeller(id) {
        return this.sellerService.deleteSeller(id);
    }
};
exports.SellerController = SellerController;
__decorate([
    (0, common_1.Post)('create/:adminId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('adminId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, seller_dto_1.CreateSellerDto]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "createSeller", null);
__decorate([
    (0, common_1.Get)('admin/:adminId'),
    __param(0, (0, common_1.Param)('adminId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellersByAdmin", null);
__decorate([
    (0, common_1.Get)('find/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSellerById", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, seller_dto_1.CreateSellerDto]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "updateSeller", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "deleteSeller", null);
exports.SellerController = SellerController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('seller'),
    __metadata("design:paramtypes", [seller_service_1.SellerService])
], SellerController);
//# sourceMappingURL=seller.controller.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerEntity = void 0;
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("../admin/admin.entity");
let SellerEntity = class SellerEntity {
    id;
    sellerName;
    shopName;
    phone;
    admin;
};
exports.SellerEntity = SellerEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SellerEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], SellerEntity.prototype, "sellerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], SellerEntity.prototype, "shopName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], SellerEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admin_entity_1.AdminEntity, (admin) => admin.sellers, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", admin_entity_1.AdminEntity)
], SellerEntity.prototype, "admin", void 0);
exports.SellerEntity = SellerEntity = __decorate([
    (0, typeorm_1.Entity)('seller')
], SellerEntity);
//# sourceMappingURL=seller.entity.js.map
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
exports.AdminEntity = void 0;
const typeorm_1 = require("typeorm");
const profile_entity_1 = require("../profile/profile.entity");
const project_entity_1 = require("../project/project.entity");
const seller_entity_1 = require("../seller/seller.entity");
let AdminEntity = class AdminEntity {
    id;
    username;
    fullName;
    email;
    password;
    isActive;
    profile;
    projects;
    sellers;
    generateId() {
        this.id = 'ADM-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    }
};
exports.AdminEntity = AdminEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], AdminEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], AdminEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], AdminEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, unique: true }),
    __metadata("design:type", String)
], AdminEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AdminEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], AdminEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => profile_entity_1.AdminProfileEntity, (profile) => profile.admin, {
        cascade: true,
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", profile_entity_1.AdminProfileEntity)
], AdminEntity.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.ProjectEntity, (project) => project.admin),
    __metadata("design:type", Array)
], AdminEntity.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => seller_entity_1.SellerEntity, (seller) => seller.admin),
    __metadata("design:type", Array)
], AdminEntity.prototype, "sellers", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminEntity.prototype, "generateId", null);
exports.AdminEntity = AdminEntity = __decorate([
    (0, typeorm_1.Entity)('admin')
], AdminEntity);
//# sourceMappingURL=admin.entity.js.map
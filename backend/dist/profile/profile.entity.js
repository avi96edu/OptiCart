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
exports.AdminProfileEntity = void 0;
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("../admin/admin.entity");
let AdminProfileEntity = class AdminProfileEntity {
    id;
    phone;
    address;
    age;
    admin;
};
exports.AdminProfileEntity = AdminProfileEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminProfileEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], AdminProfileEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], AdminProfileEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], AdminProfileEntity.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => admin_entity_1.AdminEntity, (admin) => admin.profile),
    __metadata("design:type", admin_entity_1.AdminEntity)
], AdminProfileEntity.prototype, "admin", void 0);
exports.AdminProfileEntity = AdminProfileEntity = __decorate([
    (0, typeorm_1.Entity)('admin_profile')
], AdminProfileEntity);
//# sourceMappingURL=profile.entity.js.map
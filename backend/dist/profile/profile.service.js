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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const profile_entity_1 = require("./profile.entity");
const admin_entity_1 = require("../admin/admin.entity");
let ProfileService = class ProfileService {
    profileRepository;
    adminRepository;
    constructor(profileRepository, adminRepository) {
        this.profileRepository = profileRepository;
        this.adminRepository = adminRepository;
    }
    async createProfile(adminId, dto) {
        const admin = await this.adminRepository.findOne({
            where: { id: adminId },
            relations: { profile: true },
        });
        if (!admin) {
            throw new common_1.NotFoundException('admin not found');
        }
        const profile = this.profileRepository.create(dto);
        profile.admin = admin;
        const savedProfile = await this.profileRepository.save(profile);
        admin.profile = savedProfile;
        await this.adminRepository.save(admin);
        return {
            message: 'profile created',
            data: {
                id: savedProfile.id,
                phone: savedProfile.phone,
                address: savedProfile.address,
                age: savedProfile.age,
                adminId: admin.id,
            },
        };
    }
    async getProfileByAdmin(adminId) {
        const admin = await this.adminRepository.findOne({
            where: { id: adminId },
            relations: { profile: true },
        });
        if (!admin || !admin.profile) {
            throw new common_1.NotFoundException('profile not found');
        }
        return {
            id: admin.profile.id,
            phone: admin.profile.phone,
            address: admin.profile.address,
            age: admin.profile.age,
            adminId: admin.id,
        };
    }
    async updateProfile(adminId, dto) {
        const admin = await this.adminRepository.findOne({
            where: { id: adminId },
            relations: { profile: true },
        });
        if (!admin || !admin.profile) {
            throw new common_1.NotFoundException('profile not found');
        }
        await this.profileRepository.update(admin.profile.id, dto);
        return {
            message: 'profile updated',
        };
    }
    async deleteProfile(adminId) {
        const admin = await this.adminRepository.findOne({
            where: { id: adminId },
            relations: { profile: true },
        });
        if (!admin || !admin.profile) {
            throw new common_1.NotFoundException('profile not found');
        }
        const profileId = admin.profile.id;
        admin.profile = null;
        await this.adminRepository.save(admin);
        await this.profileRepository.delete(profileId);
        return {
            message: 'profile deleted',
        };
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profile_entity_1.AdminProfileEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProfileService);
//# sourceMappingURL=profile.service.js.map
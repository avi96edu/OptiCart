"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
const bcrypt = __importStar(require("bcrypt"));
const mailer_1 = require("@nestjs-modules/mailer");
let AdminService = class AdminService {
    adminRepository;
    mailerService;
    constructor(adminRepository, mailerService) {
        this.adminRepository = adminRepository;
        this.mailerService = mailerService;
    }
    getHello() {
        return { message: 'Admin is here' };
    }
    async createAdmin(dto) {
        const user1 = await this.adminRepository.findOneBy({ username: dto.username });
        if (user1) {
            throw new common_1.BadRequestException('username already exists');
        }
        const user2 = await this.adminRepository.findOneBy({ email: dto.email });
        if (user2) {
            throw new common_1.BadRequestException('email already exists');
        }
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(dto.password, salt);
        dto.password = hash;
        const admin = this.adminRepository.create(dto);
        const savedAdmin = await this.adminRepository.save(admin);
        try {
            await this.mailerService.sendMail({
                to: savedAdmin.email,
                subject: 'Welcome to Admin Management System',
                text: 'Hello ' + savedAdmin.fullName + ', your admin account has been created successfully.',
            });
            return {
                message: 'admin created and welcome email sent',
                data: savedAdmin,
            };
        }
        catch (error) {
            console.log('MAIL ERROR:', error);
            return {
                message: 'admin created but email sending failed',
                data: savedAdmin,
            };
        }
    }
    async getBasicAdmin(username) {
        const admin = await this.adminRepository.findOneBy({ username: username });
        if (!admin) {
            throw new common_1.NotFoundException('admin not found');
        }
        return {
            username: admin.username,
            fullName: admin.fullName,
        };
    }
    async getSelectedAdmin(username, type) {
        const admin = await this.adminRepository.findOneBy({ username: username });
        if (!admin) {
            throw new common_1.NotFoundException('admin not found');
        }
        if (type === 'contact') {
            return {
                id: admin.id,
                email: admin.email,
            };
        }
        if (type === 'basic') {
            return {
                username: admin.username,
                fullName: admin.fullName,
            };
        }
        if (type === 'status') {
            return {
                username: admin.username,
                isActive: admin.isActive,
            };
        }
        if (type === 'short') {
            return {
                id: admin.id,
                username: admin.username,
            };
        }
        return {
            id: admin.id,
            username: admin.username,
            fullName: admin.fullName,
            email: admin.email,
            isActive: admin.isActive,
        };
    }
    async getAdminContact(username) {
        const admin = await this.adminRepository.findOneBy({ username: username });
        if (!admin) {
            throw new common_1.NotFoundException('admin not found');
        }
        return {
            id: admin.id,
            email: admin.email,
        };
    }
    async getAll() {
        const admins = await this.adminRepository.find({
            relations: {
                sellers: true,
            },
        });
        return admins.map((admin) => ({
            id: admin.id,
            username: admin.username,
            fullName: admin.fullName,
            email: admin.email,
            isActive: admin.isActive,
            sellers: admin.sellers?.map((seller) => ({
                id: seller.id,
                sellerName: seller.sellerName,
                shopName: seller.shopName,
                phone: seller.phone,
            })),
        }));
    }
    async findOne(username) {
        return await this.adminRepository.findOneBy({ username: username });
    }
    async getAdminByUsername(username) {
        const admin = await this.adminRepository.findOne({
            where: { username: username },
            relations: {
                sellers: true,
            },
        });
        if (!admin) {
            throw new common_1.NotFoundException('admin not found');
        }
        return {
            id: admin.id,
            username: admin.username,
            fullName: admin.fullName,
            email: admin.email,
            isActive: admin.isActive,
            sellers: admin.sellers?.map((seller) => ({
                id: seller.id,
                sellerName: seller.sellerName,
                shopName: seller.shopName,
                phone: seller.phone,
            })),
        };
    }
    async searchByName(text) {
        return await this.adminRepository.find({
            where: {
                fullName: (0, typeorm_2.Like)(`%${text}%`),
            },
        });
    }
    async updateAdmin(username, dto) {
        const admin = await this.adminRepository.findOneBy({ username: username });
        if (!admin) {
            throw new common_1.NotFoundException('admin not found');
        }
        const sameEmail = await this.adminRepository.findOneBy({ email: dto.email });
        if (sameEmail && sameEmail.username !== username) {
            throw new common_1.BadRequestException('email already exists');
        }
        await this.adminRepository.update({ username: username }, dto);
        return {
            message: 'admin updated',
        };
    }
    async updatePassword(username, dto) {
        const admin = await this.adminRepository.findOneBy({ username: username });
        if (!admin) {
            throw new common_1.NotFoundException('admin not found');
        }
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(dto.password, salt);
        await this.adminRepository.update({ username: username }, { password: hash });
        return {
            message: 'password updated',
        };
    }
    async updateStatus(username, isActive) {
        const admin = await this.adminRepository.findOneBy({ username: username });
        if (!admin) {
            throw new common_1.NotFoundException('admin not found');
        }
        await this.adminRepository.update({ username: username }, { isActive: isActive });
        return {
            message: 'status updated',
        };
    }
    async deleteAdmin(username) {
        const admin = await this.adminRepository.findOneBy({ username: username });
        if (!admin) {
            throw new common_1.NotFoundException('admin not found');
        }
        await this.adminRepository.delete({ username: username });
        return {
            message: 'admin deleted',
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService])
], AdminService);
//# sourceMappingURL=admin.service.js.map
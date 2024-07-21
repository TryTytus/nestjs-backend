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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PostService = class PostService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPostDto) {
        return await this.prisma.post.create({
            data: createPostDto,
        });
    }
    async findAll(skip, take) {
        return await this.prisma.post.findMany({
            include: {
                user: true,
            },
            skip,
            take,
        });
    }
    async findOne(id) {
        return await this.prisma.post.findFirstOrThrow({
            where: { id },
            include: {
                user: true,
            },
        });
    }
    async update(id, updatePostDto) {
        return await this.prisma.post.update({
            data: updatePostDto,
            where: { id },
        });
    }
    async remove(id) {
        return await this.prisma.post.delete({
            where: { id },
        });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
//# sourceMappingURL=post.service.js.map
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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const search_service_1 = require("../search.service");
let UserService = class UserService {
    constructor(prisma, search) {
        this.prisma = prisma;
        this.search = search;
    }
    async create(createUserDto) {
        const user = await this.prisma.user.create({
            data: createUserDto,
        });
        await this.search.users.addDocuments([
            { id: user.id, name: user.name, nickname: user.nickname },
        ]);
        return user;
    }
    async findAll() {
        return await this.prisma.user.findMany();
    }
    async findOne(id) {
        return await this.prisma.user.findFirstOrThrow({ where: { id } });
    }
    async update(id, updateUserDto) {
        return await this.prisma.user.update({
            data: updateUserDto,
            where: { id },
        });
    }
    async remove(id) {
        const user = await this.prisma.user.delete({
            where: { id },
        });
        await this.search.users.deleteDocument(id);
        return user;
    }
    async fileUpload(userId, avatar, bgImg, bio) {
        return await this.prisma.user.update({
            where: { id: userId },
            data: {
                avatar,
                bgimg: bgImg,
                bio,
            },
        });
    }
    async sync() {
        const posts = (await this.prisma.post.findMany()).map((post) => ({ ...post }));
        await this.search.posts.addDocuments(posts);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        search_service_1.SearchService])
], UserService);
//# sourceMappingURL=user.service.js.map
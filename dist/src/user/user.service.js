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
const node_fs_1 = require("node:fs");
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
    async findById(id) {
        return await this.prisma.user.findFirstOrThrow({ where: { id } });
    }
    async findByNickname(nickname) {
        return await this.prisma.user.findFirst({
            where: { nickname },
        });
    }
    async findUserPosts(nickname) {
        return await this.prisma.post.findMany({
            where: { user: { nickname } },
            include: {
                user: true,
            }
        });
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
        const user = await this.findById(userId);
        const oldAvatar = user.avatar;
        const oldBgImg = user.bgimg;
        if (oldAvatar) {
            try {
                await node_fs_1.promises.unlink('./public/' + oldAvatar);
            }
            catch (error) {
                console.error('Error removing old avatar:', error);
            }
        }
        if (oldBgImg) {
            try {
                await node_fs_1.promises.unlink('./public/' + oldBgImg);
            }
            catch (error) {
                console.error('Error removing old background image:', error);
            }
        }
        if (oldAvatar)
            await node_fs_1.promises.rename('./public/' + avatar, './public/' + oldAvatar);
        if (oldBgImg)
            await node_fs_1.promises.rename('./public/' + bgImg, './public/' + oldBgImg);
        const newAvatar = (oldAvatar) ? oldAvatar : avatar;
        const newBgImg = (oldBgImg) ? oldBgImg : bgImg;
        await this.search.users.deleteDocument(userId);
        await this.search.users.addDocuments([
            { id: userId, name: user.name, nickname: user.nickname, avatar: newAvatar },
        ]);
        return await this.prisma.user.update({
            where: { id: userId },
            data: {
                avatar: (oldAvatar) ? oldAvatar : avatar,
                bgimg: (oldBgImg) ? oldBgImg : bgImg,
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
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
exports.PostLikesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PostLikesService = class PostLikesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async like(postId, userId) {
        const like = await this.prisma.postLikes.create({
            data: {
                postId,
                userId,
            },
        });
        await this.prisma.post.update({
            where: { id: postId },
            data: { likesCount: { increment: 1 } },
        });
        return like;
    }
    async dislike(postId, userId) {
        const like = await this.prisma.postLikes.delete({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });
        await this.prisma.post.update({
            where: { id: postId },
            data: { likesCount: { decrement: 1 } },
        });
        return like;
    }
};
exports.PostLikesService = PostLikesService;
exports.PostLikesService = PostLikesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostLikesService);
//# sourceMappingURL=post-likes.service.js.map
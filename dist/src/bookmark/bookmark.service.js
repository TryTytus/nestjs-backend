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
exports.BookmarkService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let BookmarkService = class BookmarkService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(postId, userId) {
        const bookmark = await this.prisma.bookmark.create({
            data: {
                postId,
                userId,
            },
        });
        return bookmark;
    }
    async findAll(skip, take, userId) {
        const bookmarks = await this.prisma.bookmark.findMany({
            where: { userId }
        });
        const postBookmarkIds = bookmarks.map(bookmark => bookmark.postId);
        const posts = await this.prisma.post.findMany({
            where: { id: { in: postBookmarkIds } },
            include: {
                user: true,
            },
            skip,
            take,
        });
        const postIds = posts.map((post) => post.id);
        await this.prisma.post.updateMany({
            where: {
                id: {
                    in: postIds,
                },
            },
            data: {
                viewsCont: { increment: 1 },
            },
        });
        if (userId === undefined)
            return posts;
        const likedPosts = await this.prisma.postLikes.findMany({
            where: { userId },
            select: { postId: true },
        });
        const likedPostsIds = new Set(likedPosts.map((like) => like.postId));
        const postsWithIsLiked = posts.map((post) => ({
            ...post,
            isLiked: likedPostsIds.has(post.id),
            isBookmarked: true,
        }));
        return postsWithIsLiked;
    }
    async remove(postId, userId) {
        const bookmark = await this.prisma.bookmark.delete({
            where: {
                postId_userId: {
                    postId,
                    userId,
                },
            },
        });
        return bookmark;
    }
};
exports.BookmarkService = BookmarkService;
exports.BookmarkService = BookmarkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookmarkService);
//# sourceMappingURL=bookmark.service.js.map
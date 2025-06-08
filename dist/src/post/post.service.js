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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const mongoose_1 = require("mongoose");
const search_service_1 = require("../search.service");
let PostService = class PostService {
    constructor(prisma, postModel, search) {
        this.prisma = prisma;
        this.postModel = postModel;
        this.search = search;
    }
    async create(createPostDto) {
        const post = await this.prisma.post.create({
            data: createPostDto,
        });
        await this.postModel.create({ postId: post.id });
        await this.search.posts.addDocuments([post]);
        return post;
    }
    async findAll(skip, take, userId, orderBy, order) {
        const posts = await this.prisma.post.findMany({
            include: {
                user: true,
            },
            skip,
            take,
            orderBy: {
                [orderBy]: order
            }
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
        const bookmarkedPosts = await this.prisma.bookmark.findMany({
            where: { userId },
            select: { postId: true },
        });
        const likedPostsIds = new Set(likedPosts.map((like) => like.postId));
        const bookmarkedIds = new Set(bookmarkedPosts.map((like) => like.postId));
        const postsWithIsLiked = posts.map((post) => ({
            ...post,
            isLiked: likedPostsIds.has(post.id),
            isBookmarked: bookmarkedIds.has(post.id),
        }));
        return postsWithIsLiked;
    }
    async findOne(id, userId) {
        const post = await this.prisma.post.update({
            where: { id },
            include: {
                user: true,
            },
            data: {
                viewsCont: { increment: 1 },
            },
        });
        post;
        if (userId === undefined)
            return post;
        const isLiked = null !==
            (await this.prisma.postLikes.findFirst({
                where: { userId, postId: id },
            }));
        const isBookmarked = null !==
            (await this.prisma.bookmark.findFirst({
                where: { userId, postId: id },
            }));
        return { ...post, isLiked, isBookmarked };
    }
    async update(id, updatePostDto) {
        return await this.prisma.post.update({
            data: updatePostDto,
            where: { id },
        });
    }
    async remove(id) {
        const post = await this.prisma.post.delete({
            where: { id },
        });
        await this.postModel.deleteOne({ postId: post.id });
        await this.search.posts.deleteDocument(post.id);
        return post;
    }
    async addPostToSerchable() {
        const documents = [
            {
                id: 1,
                content: 'Bajo jajo',
            },
        ];
        let res = await this.search.posts.addDocuments(documents);
        console.log(res);
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('POST_MODEL')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mongoose_1.Model,
        search_service_1.SearchService])
], PostService);
//# sourceMappingURL=post.service.js.map
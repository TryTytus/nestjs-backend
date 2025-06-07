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
exports.CommentService = exports.Comment = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("../prisma.service");
const mongodb_1 = require("mongodb");
var _ = require('lodash');
class Comment {
}
exports.Comment = Comment;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Comment.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Comment.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Comment.prototype, "bgimg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], Comment.prototype, "comments", void 0);
let CommentService = class CommentService {
    constructor(commentModel, postModel, prisma) {
        this.commentModel = commentModel;
        this.postModel = postModel;
        this.prisma = prisma;
    }
    async get(id) {
        return (await this.postModel
            .findOne({
            postId: id,
        })
            .exec()).comments;
    }
    async create(createCommentDto, path, postId) {
        createCommentDto._id = new mongodb_1.ObjectId();
        const { userId } = createCommentDto;
        const user = await this.prisma.user.findFirstOrThrow({
            where: { id: userId },
        });
        createCommentDto.name = user.name;
        createCommentDto.bgimg = user.avatar;
        const updateQuery = {};
        const fullPath = path === '' ? 'comments' : 'comments.' + path;
        updateQuery[fullPath] = createCommentDto;
        const updatedComment = await this.postModel.findOneAndUpdate({ postId }, { $push: updateQuery }, { new: true });
        console.log(updatedComment);
        await this.prisma.post.update({
            where: { id: Number.parseInt(postId) },
            data: {
                commentsCount: { increment: 1 },
            },
        });
        await this.prisma.commentInfo.create({
            data: {
                id: createCommentDto._id.toString(),
                postId: Number.parseInt(postId),
                userId,
            },
        });
        return createCommentDto;
    }
    async likeComment(postId, userId, path) {
        let fullPath = path === '' ? 'comments' : 'comments.' + path;
        const post = await this.postModel
            .findOne({
            postId,
        })
            .populate({ path: fullPath });
        const nestedId = _.get(post, fullPath.split('.').slice(0, -1))._id;
        fullPath = fullPath.slice(0, -9);
        const likesPath = fullPath + '.likesCount';
        const data = {
            postId: Number.parseInt(postId),
            userId,
            commentInfoId: nestedId.toString(),
        };
        await this.prisma.commentLikes.create({
            data
        });
        const updatedComment = await this.postModel.findOneAndUpdate({ postId }, { $inc: { [likesPath]: 1 } }, { new: true });
        if (!updatedComment) {
            throw new Error('Comment not found');
        }
        return updatedComment;
    }
    async dislikeComment(postId, userId, path) {
        let fullPath = path === '' ? 'comments' : 'comments.' + path;
        const post = await this.postModel
            .findOne({
            postId,
        })
            .populate({ path: fullPath });
        const nestedId = _.get(post, fullPath.split('.').slice(0, -1))._id;
        fullPath = fullPath.slice(0, -9);
        const likesPath = fullPath + '.likesCount';
        const data = {
            postId: Number.parseInt(postId),
            userId,
            commentInfoId: nestedId.toString(),
        };
        await this.prisma.commentLikes.delete({
            where: {
                commentInfoId_postId_userId: data
            }
        });
        const updatedComment = await this.postModel.findOneAndUpdate({ postId }, { $inc: { [likesPath]: -1 } }, { new: true });
        if (!updatedComment) {
            throw new Error('Comment not found');
        }
        return updatedComment;
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('COMMENT_MODEL')),
    __param(1, (0, common_1.Inject)('POST_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        prisma_service_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map
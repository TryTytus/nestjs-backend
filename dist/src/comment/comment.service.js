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
    __metadata("design:type", Array)
], Comment.prototype, "comments", void 0);
let CommentService = class CommentService {
    constructor(commentModel) {
        this.commentModel = commentModel;
    }
    async get() {
        const _id = '669e65df1fdd5571e92ee1cb';
        return await this.commentModel.findById(_id);
    }
    async getNested() {
        const _id = '669e65df1fdd5571e92ee1cb';
        const path = 'comments.0.comments.0';
        return await this.commentModel.findById(_id).populate(path).exec();
    }
    async create(createCommentDto, path) {
        const _id = '669e65df1fdd5571e92ee1cb';
        const nestedPath = 'comments.0.comments.0.comments';
        const updateQuery = {};
        updateQuery[path] = createCommentDto;
        const updatedComment = await this.commentModel.updateOne({ _id: _id }, { $push: updateQuery }, { new: true });
        console.log(updatedComment);
        return createCommentDto;
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('COMMENT_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CommentService);
//# sourceMappingURL=comment.service.js.map
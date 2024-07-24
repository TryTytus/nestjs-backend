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
exports.CommentController = exports.Comment = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const comment_service_1 = require("./comment.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const swagger_2 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
class Comment {
}
exports.Comment = Comment;
__decorate([
    (0, swagger_2.ApiProperty)(),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, swagger_2.ApiProperty)(),
    __metadata("design:type", String)
], Comment.prototype, "userId", void 0);
__decorate([
    (0, swagger_2.ApiProperty)(),
    __metadata("design:type", String)
], Comment.prototype, "name", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ type: [Comment] }),
    __metadata("design:type", Array)
], Comment.prototype, "comments", void 0);
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async get(id) {
        return await this.commentService.get(+id);
    }
    async getNested() {
        return this.commentService.getNested();
    }
    create(createCommentDto, path = '', postId, session) {
        createCommentDto.userId = session.getUserId();
        return this.commentService.create(createCommentDto, path, postId);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Get comments', type: [Comment] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/nested'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getNested", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    (0, swagger_1.ApiQuery)({ name: 'path', required: false, type: String }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('path')),
    __param(2, (0, common_1.Query)('postId')),
    __param(3, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto, String, String, Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "create", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('comment'),
    (0, swagger_1.ApiTags)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map
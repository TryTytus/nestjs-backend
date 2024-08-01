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
exports.CommentLikesController = void 0;
const common_1 = require("@nestjs/common");
const comment_likes_service_1 = require("./comment-likes.service");
const update_comment_like_dto_1 = require("./dto/update-comment-like.dto");
const auth_guard_1 = require("../auth/auth.guard");
const session_decorator_1 = require("../auth/session/session.decorator");
const swagger_1 = require("@nestjs/swagger");
let CommentLikesController = class CommentLikesController {
    constructor(commentLikesService) {
        this.commentLikesService = commentLikesService;
    }
    create(postId, session) {
        const userId = session.getUserId();
        return this.commentLikesService.create(+postId, userId);
    }
    findAll() {
        return { message: 'Hello world!' };
    }
    findOne(id) {
        return this.commentLikesService.findOne(+id);
    }
    update(id, updateCommentLikeDto) {
        return this.commentLikesService.update(+id, updateCommentLikeDto);
    }
    remove(id) {
        return this.commentLikesService.remove(+id);
    }
};
exports.CommentLikesController = CommentLikesController;
__decorate([
    (0, common_1.Post)(':postId'),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, session_decorator_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_like_dto_1.UpdateCommentLikeDto]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentLikesController.prototype, "remove", null);
exports.CommentLikesController = CommentLikesController = __decorate([
    (0, common_1.Controller)('comment-likes'),
    (0, swagger_1.ApiTags)('comment-likes'),
    __metadata("design:paramtypes", [comment_likes_service_1.CommentLikesService])
], CommentLikesController);
//# sourceMappingURL=comment-likes.controller.js.map
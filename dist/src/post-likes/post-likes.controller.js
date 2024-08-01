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
exports.PostLikesController = void 0;
const common_1 = require("@nestjs/common");
const post_likes_service_1 = require("./post-likes.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const session_decorator_1 = require("../auth/session/session.decorator");
let PostLikesController = class PostLikesController {
    constructor(postLikesService) {
        this.postLikesService = postLikesService;
    }
    like(postId, session) {
        const userId = session.getUserId();
        return this.postLikesService.like(+postId, userId);
    }
    dislike(postId, session) {
        const userId = session.getUserId();
        return this.postLikesService.dislike(+postId, userId);
    }
};
exports.PostLikesController = PostLikesController;
__decorate([
    (0, common_1.Post)('like/:postId'),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, session_decorator_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostLikesController.prototype, "like", null);
__decorate([
    (0, common_1.Post)('dislike/:postId'),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, session_decorator_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostLikesController.prototype, "dislike", null);
exports.PostLikesController = PostLikesController = __decorate([
    (0, common_1.Controller)('post-likes'),
    (0, swagger_1.ApiTags)('post-likes'),
    __metadata("design:paramtypes", [post_likes_service_1.PostLikesService])
], PostLikesController);
//# sourceMappingURL=post-likes.controller.js.map
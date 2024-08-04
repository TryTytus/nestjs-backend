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
exports.BookmarkController = void 0;
const common_1 = require("@nestjs/common");
const bookmark_service_1 = require("./bookmark.service");
const auth_guard_1 = require("../auth/auth.guard");
const session_decorator_1 = require("../auth/session/session.decorator");
const swagger_1 = require("@nestjs/swagger");
let BookmarkController = class BookmarkController {
    constructor(bookmarkService) {
        this.bookmarkService = bookmarkService;
    }
    create(postId, session) {
        const userId = session.getUserId();
        return this.bookmarkService.create(+postId, userId);
    }
    findAll(skip = '0', take = '15', session) {
        let userId;
        if (session !== undefined)
            userId = session.getUserId();
        return this.bookmarkService.findAll(+skip, +take, userId);
    }
    remove(postId, session) {
        const userId = session.getUserId();
        return this.bookmarkService.remove(+postId, userId);
    }
};
exports.BookmarkController = BookmarkController;
__decorate([
    (0, common_1.Post)(':postId'),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, session_decorator_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookmarkController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, session_decorator_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], BookmarkController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':postId'),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, session_decorator_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookmarkController.prototype, "remove", null);
exports.BookmarkController = BookmarkController = __decorate([
    (0, common_1.Controller)('bookmark'),
    (0, swagger_1.ApiTags)('bookmark'),
    __metadata("design:paramtypes", [bookmark_service_1.BookmarkService])
], BookmarkController);
//# sourceMappingURL=bookmark.controller.js.map
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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const auth_guard_1 = require("../auth/auth.guard");
const session_decorator_1 = require("../auth/session/session.decorator");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const storage_1 = require("../storage");
const file_upload_dto_1 = require("./dto/file-upload.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    create(createUserDto, session) {
        createUserDto.id = session.getUserId();
        return this.userService.create(createUserDto);
    }
    findAll() {
        return this.userService.findAll();
    }
    findUserPosts(userId) {
        return this.userService.findUserPosts(userId);
    }
    findOne(id) {
        return this.userService.findById(id);
    }
    findByNickname(nickname) {
        return this.userService.findByNickname(nickname);
    }
    update(updateUserDto, session) {
        const userId = session.getUserId();
        return this.userService.update(userId, updateUserDto);
    }
    remove(session) {
        const userId = session.getUserId();
        return this.userService.remove(userId);
    }
    uploadFile(file) {
        return 'file uploaded';
    }
    async updateProfile(files, bio, session) {
        const userId = session.getUserId();
        return this.userService.fileUpload(userId, files.avatar[0].filename, files.bgImg[0].filename, bio);
    }
    async sync() {
        return this.userService.sync();
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, session_decorator_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('posts/:nickname'),
    __param(0, (0, common_1.Param)('nickname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUserPosts", null);
__decorate([
    (0, common_1.Get)('byId/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('byNickname/:nickname'),
    __param(0, (0, common_1.Param)('nickname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findByNickname", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, session_decorator_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    __param(0, (0, session_decorator_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './public',
            filename: (req, file, callback) => {
                callback(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}.${file.originalname.split('.').pop()}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('updateProfile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(new auth_guard_1.AuthGuard()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'avatar', maxCount: 1 },
        { name: 'bgImg', maxCount: 1 },
    ], storage_1.storage)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('bio')),
    __param(2, (0, session_decorator_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_upload_dto_1.FileUpload, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('sync'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sync", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map
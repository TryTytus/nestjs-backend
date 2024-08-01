"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_controller_1 = require("./post.controller");
const prisma_service_1 = require("../prisma.service");
const post_provider_1 = require("./post.provider");
const mongodb_module_1 = require("../../mongodb/mongodb.module");
const search_service_1 = require("../search.service");
let PostModule = class PostModule {
};
exports.PostModule = PostModule;
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [mongodb_module_1.MongoDbModule],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService, prisma_service_1.PrismaService, ...post_provider_1.postProviders, search_service_1.SearchService],
    })
], PostModule);
//# sourceMappingURL=post.module.js.map
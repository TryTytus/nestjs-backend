"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const user_module_1 = require("./user/user.module");
const prisma_service_1 = require("./prisma.service");
const post_module_1 = require("./post/post.module");
const comment_module_1 = require("./comment/comment.module");
const comment_likes_module_1 = require("./comment-likes/comment-likes.module");
const events_gateway_1 = require("./events/events.gateway");
const search_service_1 = require("./search.service");
const post_likes_module_1 = require("./post-likes/post-likes.module");
const bookmark_module_1 = require("./bookmark/bookmark.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule.forRoot({
                connectionURI: 'http://localhost:3567',
                appInfo: {
                    appName: 'twitter',
                    apiDomain: 'http://localhost:3000',
                    websiteDomain: 'http://localhost:5173',
                    apiBasePath: '/auth',
                    websiteBasePath: '/auth',
                },
            }),
            user_module_1.UserModule,
            post_module_1.PostModule,
            comment_module_1.CommentModule,
            comment_likes_module_1.CommentLikesModule,
            post_likes_module_1.PostLikesModule,
            bookmark_module_1.BookmarkModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService, events_gateway_1.EventsGateway, search_service_1.SearchService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
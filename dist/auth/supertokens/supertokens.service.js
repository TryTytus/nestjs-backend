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
exports.SupertokensService = void 0;
const common_1 = require("@nestjs/common");
const supertokens_node_1 = require("supertokens-node");
const session_1 = require("supertokens-node/recipe/session");
const thirdparty_1 = require("supertokens-node/recipe/thirdparty");
const emailpassword_1 = require("supertokens-node/recipe/emailpassword");
const config_interface_1 = require("../config.interface");
let SupertokensService = class SupertokensService {
    constructor(config) {
        this.config = config;
        supertokens_node_1.default.init({
            appInfo: config.appInfo,
            supertokens: {
                connectionURI: config.connectionURI,
                apiKey: config.apiKey,
            },
            recipeList: [
                emailpassword_1.default.init(),
                thirdparty_1.default.init({
                    signInAndUpFeature: {
                        providers: [
                            {
                                config: {
                                    thirdPartyId: 'google',
                                    clients: [
                                        {
                                            clientId: '97344913273-b6d182j96t9ln245i4ji58qh08mue729.apps.googleusercontent.com',
                                            clientSecret: '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',
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                }),
                session_1.default.init(),
            ],
        });
    }
};
exports.SupertokensService = SupertokensService;
exports.SupertokensService = SupertokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_interface_1.ConfigInjectionToken)),
    __metadata("design:paramtypes", [Object])
], SupertokensService);
//# sourceMappingURL=supertokens.service.js.map
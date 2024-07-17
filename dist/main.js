"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const supertokens_node_1 = require("supertokens-node");
const app_module_1 = require("./app.module");
const auth_filter_1 = require("./auth/auth.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:5173'],
        allowedHeaders: ['content-type', ...supertokens_node_1.default.getAllCORSHeaders()],
        credentials: true,
    });
    app.useGlobalFilters(new auth_filter_1.SupertokensExceptionFilter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
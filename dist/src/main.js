"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const supertokens_node_1 = require("supertokens-node");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const auth_filter_1 = require("./auth/auth.filter");
const common_1 = require("@nestjs/common");
const prisma_client_exception_filter_1 = require("./prisma-client-exception/prisma-client-exception.filter");
const openapi_1 = require("./openapi");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', '..', 'views'));
    app.setViewEngine('hbs');
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('api for twitter')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const swaggerOpt = {
        patchDocumentOnRequest: openapi_1.patchDocumentOnRequest,
    };
    swagger_1.SwaggerModule.setup('api', app, document, swaggerOpt);
    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080'],
        allowedHeaders: ['content-type', ...supertokens_node_1.default.getAllCORSHeaders()],
        credentials: true,
    });
    const { httpAdapter } = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new prisma_client_exception_filter_1.PrismaClientExceptionFilter(httpAdapter));
    app.useGlobalFilters(new auth_filter_1.SupertokensExceptionFilter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const supertokens_node_1 = require("supertokens-node");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const auth_filter_1 = require("./auth/auth.filter");
const common_1 = require("@nestjs/common");
const prisma_client_exception_filter_1 = require("./prisma-client-exception/prisma-client-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('api for twitter')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    const patchDocumentOnRequest = (req, res, doc) => {
        const path = {
            post: {
                tags: ['SignIn'],
                operationId: 'signIn',
                description: 'Signin a user with email ID and password',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                example: {
                                    formFields: [
                                        {
                                            id: 'email',
                                            value: 'adamtyton1@gmail.com',
                                        },
                                        {
                                            id: 'password',
                                            value: '#Dupa1234',
                                        },
                                    ],
                                },
                            },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'token',
                    },
                },
            },
        };
        doc.paths['/auth/signin'] = path;
        doc.info.description = 'Customized API description';
        return doc;
    };
    const swaggerOpt = {
        patchDocumentOnRequest,
    };
    swagger_1.SwaggerModule.setup('api', app, document, swaggerOpt);
    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:3000'],
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
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import supertokens from 'supertokens-node';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
  OpenAPIObject,
} from '@nestjs/swagger';

import { SupertokensExceptionFilter } from './auth/auth.filter';
import { ValidationPipe } from '@nestjs/common';
import { PathItemObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('api for twitter')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Customize the OpenAPI document before serving
  const patchDocumentOnRequest = (req, res, doc: OpenAPIObject) => {
    // Modify the document as needed

    const path: PathItemObject = {
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
    // Add or modify other properties as needed
    return doc;
  };

  const swaggerOpt: SwaggerCustomOptions = {
    patchDocumentOnRequest,
  };

  SwaggerModule.setup('api', app, document, swaggerOpt);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.useGlobalFilters(new SupertokensExceptionFilter());

  await app.listen(3000);
}

bootstrap();

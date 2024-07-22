import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import supertokens from 'supertokens-node';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

import { SupertokensExceptionFilter } from './auth/auth.filter';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { patchDocumentOnRequest } from './openapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('api for twitter')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

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

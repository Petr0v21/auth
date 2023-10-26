import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { graphqlUploadExpress } from 'graphql-upload-ts';
// import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
// Ignore the import error
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(graphqlUploadExpress({ maxFileSize: 25000000, maxFiles: 10 }));
  app.enableCors();
  await app.listen(Number(process.env.PORT) ?? 5000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';
import helmet from 'helmet';
import { ConsoleLogger, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'LUKANU',
    }),
  });
  const logger = new Logger('APP');

  const config = new DocumentBuilder()
    .setTitle('Lukanu')
    .setDescription('API refernece')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.enableCors("'http://localhost:3000'");
  app.use(
    '/docs',
    apiReference({
      content: document,
      theme: 'deepSpace',
      title: 'lukaku API documentation',
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  app.use(helmet());
  app.use(compression());
  await app.listen(process.env.PORT ?? 3000);
  logger.verbose(
    `Documentation ready on http://localhost:${process.env.PORT}/docs`,
  );
}
bootstrap();

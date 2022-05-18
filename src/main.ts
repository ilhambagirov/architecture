import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalPipes } from './core/config/global-pipes.config';
import { SwaggerInit } from './core/config/swagger.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  app.enableCors()
  app.enableVersioning({
    type: VersioningType.URI
  })
  SwaggerInit(app)
  GlobalPipes(app)
  await app.listen(3001);
}
bootstrap();


// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  // Prefix all routes with /api
  app.setGlobalPrefix('api');

  // CORS for your React app (support comma-separated list in env)
  const origins = process.env.FRONTEND_ORIGIN
    ? process.env.FRONTEND_ORIGIN.split(',').map(s => s.trim())
    : ['http://localhost:5173']; // Vite default
  app.enableCors({
    origin: origins,
    credentials: true,
  });

  // Strict request validation & transformation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Learning Activities API')
    .setDescription('Endpoints for analysts, courses, trainers, and learning activities')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // opens at /docs

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
}
bootstrap();

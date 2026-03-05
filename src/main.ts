/* eslint-disable @typescript-eslint/no-floating-promises */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NutriGo API')
    .setDescription('Saúde que chega até você')
    .setContact(
      'NutriGo',
      'https://github.com/Grupo-02-Turma-JavaScript-12/Aplicativo-de-Delivery-BackEnd',
      'mcarvalho093@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  const port = Number(process.env.PORT) || 4000;

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Aplicação rodando na porta ${port}`);
}
bootstrap();

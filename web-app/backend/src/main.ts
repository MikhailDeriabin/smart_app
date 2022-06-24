import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const swaggerInfo = {
  api_patch: "/docs",
  title: "SmartApp API",
  decription: "Here you can test all crud operations",
  version: "1.0",
  tag:""

};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config= new DocumentBuilder()
      .addBearerAuth(
          { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          'access-token',
      )
      .setTitle(swaggerInfo.title)
      .setDescription(swaggerInfo.decription)
      .setVersion(swaggerInfo.version)
      .addTag(swaggerInfo.tag)
      .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup(swaggerInfo.api_patch, app, document);
  await app.listen(3000);
}
bootstrap();

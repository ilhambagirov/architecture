import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const SwaggerInit = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle(process.env.APP_NAME)
        .setDescription('Api documentation for Nest Js Architecture')
        .setVersion(process.env.version)
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/swagger', app, document)
}
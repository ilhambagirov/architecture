import { INestApplication, ValidationPipe } from '@nestjs/common'

export function GlobalPipes(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));
};
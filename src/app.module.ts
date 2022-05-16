import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { dbConfig } from './core/config/db.config';
import { recatchaConfig } from './core/config/google-recaptcha.config';
import { UsersModule } from './domains/users/users.module';
import { AuthModule } from './core/auth/auth.module';


@Module({
  imports: [
    SequelizeModule.forRoot(dbConfig),
    GoogleRecaptchaModule.forRoot(recatchaConfig),
    UsersModule,
    AuthModule
  ],
})
export class AppModule { }

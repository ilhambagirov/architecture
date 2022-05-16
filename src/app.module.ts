import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { dbConfig } from './core/config/db.config';
import { recatchaConfig } from './core/config/google-recaptcha.config';
import { UsersModule } from './domains/users/users.module';


@Module({
  imports: [
    SequelizeModule.forRoot(dbConfig),
    GoogleRecaptchaModule.forRoot(recatchaConfig),
    UsersModule
  ],
})
export class AppModule { }

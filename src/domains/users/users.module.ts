import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './controllers/users.controller';
import { Users } from './models/users.model';
import { UsersService } from './services/services.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([Users])],
  exports: [UsersService],
})
export class UsersModule {}

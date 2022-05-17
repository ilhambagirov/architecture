import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Network, NetworkModule } from 'src/core/helper/send-email';
import { UsersController } from './controllers/users.controller';
import { Users } from './models/users.model';
import { UsersService } from './services/services.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, Network],
  imports: [SequelizeModule.forFeature([Users]), NetworkModule],
  exports: [UsersService],
})
export class UsersModule {}

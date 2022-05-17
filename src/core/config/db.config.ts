import { SequelizeModuleOptions } from '@nestjs/sequelize/dist/interfaces/sequelize-options.interface';
import { Dialect } from 'sequelize/types';

//const dialect=process.env.DB_DIALECT as Dialect
export const dbConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ilham123',
  database: 'architecture',
  synchronize: true,
  sync: {
    alter: true,
  },
  autoLoadModels: true,
  models: [],
};

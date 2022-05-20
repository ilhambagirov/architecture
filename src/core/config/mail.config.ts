import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export const mailConfig = {
  transport: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'ilikobagirov@gmail.com',
      pass: '0504964647',
    },
  },
  defaults: {
    from: '"Ilham Baghirov" <ilhambagirov027@gmail.com>',
  },
  template: {
    dir: join(__dirname, 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};

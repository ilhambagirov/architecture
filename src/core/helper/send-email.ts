import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Module } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'src/core/concrete/response';
import { UsersDso } from 'src/domains/users/dsos/user.dso';
@Injectable()
export class Network {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string, subject: string, text: string, link: string) {
    this.mailerService
      .sendMail({
        to,
        from: 'ilikobagirov@gmail.com',
        subject,
        text,
        html: `<b>${
          text + `<a href=http://localhost:3000/users/confirm/${link}> link</a>`
        }</b>`,
      })
      .then(() => {})
      .catch((e) => {
        console.log('---------------------------------------------------' + e);
      });
  }

  async sendMailTemplate(
    to: string,
    subject: string,
    payload: Response<UsersDso>,
    link: string,
  ) {
    this.mailerService
      .sendMail({
        to,
        from: 'ilikobagirov@gmail.com',
        subject,
        context: {
          firstname: payload.data.name,
          lastname: payload.data.lastname,
          patronymic: payload.data.patronymic,
          link: `http://localhost:3001/users/confirm/${link}`,
        },
        template: 'email-confirm',
      })
      .then(() => {})
      .catch((e: Error) => {
        console.log(
          e+ '--------------------------0000'
        );
      });
  }
}

@Module({
  providers: [Network],
})
export class NetworkModule {}

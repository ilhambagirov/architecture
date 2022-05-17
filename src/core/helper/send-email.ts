import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Module } from '@nestjs/common';

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
        html: `<b>${text + `<a href=http://localhost:3000/users/confirm/${link}> link</a>`}</b>`,
      })
      .then(() => {})
      .catch(() => {});
  }
}

@Module({
  providers: [Network],
})
export class NetworkModule {}

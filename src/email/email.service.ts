import { Injectable } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';

@Injectable()
export class EmailService {
  constructor(private readonly sendGridService: SendGridService) {}

  async sendEmail(
    to: string,
    from: string,
    subject: string,
    text: string,
    html: string,
  ) {
    await this.sendGridService.send({
      to,
      from,
      subject,
      text,
      html,
    });
  }
}

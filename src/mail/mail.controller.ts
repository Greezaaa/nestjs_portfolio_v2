// ./mail/mail.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfirmEmailDto } from './dto';
import { SendedMailResponse } from './interfaces/sended-email-response.interface';

@Controller('/mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  //email sending route for one email address
  @Post('confirm')
  async sendEmail(@Body() sendEmailDto: ConfirmEmailDto): Promise<SendedMailResponse> {
    const {to, confirmationCode}  = sendEmailDto;
    const response = await this.mailService.sendEmail(to, confirmationCode );
    return response;
  }

  
}


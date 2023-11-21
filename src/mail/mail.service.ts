import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { SendedMailResponse } from './interfaces/sended-email-response.interface';
import { templateConfirmationEmail } from './templates';



@Injectable()
export class MailService {
    private mg;

    constructor() {
        const mailgun = new Mailgun(FormData as any);
        const mailgunApiUrl = 'https://api.eu.mailgun.net';
        this.mg = mailgun.client({
            username: 'api',
            key: process.env.MAILGUN_API_KEY || 'key-not-found',
            url: mailgunApiUrl,
        });
    }

    async sendEmail(
        to: string,
        confirmationCode: string,

    ): Promise<SendedMailResponse> {

        const subject = `no-reply: Email Confirmation Code | ${ process.env.DOMAIN }`;
        const { text, html } = templateConfirmationEmail(confirmationCode, process.env.DOMAIN)
        try {
            const fromAddress = `support <no-replay@${ process.env.MAILGUN_DOMAIN }>`;
            const messageData = {
                from: fromAddress,
                to: to,
                subject: subject,
                text: text,
                html: html,
            };
            const response = await this.mg.messages.create(process.env.MAILGUN_DOMAIN || 'greezaaa.es', messageData);
            console.log(response);

            return {
                status: response.status,
                email: to,
                message: response.message,
            }
        } catch (error) {
            console.error("Mailgun error:", error);
            throw new Error(`Failed to send email: ${ error.message } (Status: ${ error.status })`);
        }
    }
}

import { Injectable } from '@nestjs/common';
import { EmailInterface } from '@gitroom/nestjs-libraries/emails/email.interface';
import { ResendProvider } from '@gitroom/nestjs-libraries/emails/resend.provider';
import { EmptyProvider } from '@gitroom/nestjs-libraries/emails/empty.provider';
import { NodeMailerProvider } from '@gitroom/nestjs-libraries/emails/node.mailer.provider';
import { SesProvider } from '@gitroom/nestjs-libraries/emails/ses.provider';
import { TemporalService } from 'nestjs-temporal-core';
import { timer } from '@gitroom/helpers/utils/timer';
import { randomUUID } from 'crypto';

@Injectable()
export class EmailService {
  emailService: EmailInterface;
  constructor(private _temporalService: TemporalService) {
    this.emailService = this.selectProvider(process.env.EMAIL_PROVIDER!);
    console.log('Email service provider:', this.emailService.name);
    for (const key of this.emailService.validateEnvKeys) {
      if (!process.env[key]) {
        console.error(`Missing environment variable: ${key}`);
      }
    }
  }

  hasProvider() {
    return !(this.emailService instanceof EmptyProvider);
  }

  selectProvider(provider: string) {
    switch (provider) {
      case 'resend':
        return new ResendProvider();
      case 'nodemailer':
        return new NodeMailerProvider();
      case 'ses':
        return new SesProvider();
      default:
        return new EmptyProvider();
    }
  }

  async sendEmail(
    to: string,
    subject: string,
    html: string,
    addTo: 'top' | 'bottom',
    replyTo?: string
  ) {
    if (!to || !subject) {
      return;
    }

    return this._temporalService.client
      .getRawClient()
      ?.workflow.start('sendSingleEmailWorkflow', {
        taskQueue: 'main',
        workflowId: `send_email_${randomUUID()}`,
        args: [{ to, subject, html, replyTo, addTo }],
      });
  }

  async sendEmailSync(
    to: string,
    subject: string,
    html: string,
    replyTo?: string
  ) {
    if (to.indexOf('@') === -1) {
      return;
    }

    if (!process.env.EMAIL_FROM_ADDRESS || !process.env.EMAIL_FROM_NAME) {
      console.log(
        'Email sender information not found in environment variables'
      );
      return;
    }

    const settingsUrl = `${process.env.FRONTEND_URL}/settings`;
    // Mail clients show an unsubscribe link next to the sender, it opens the
    // settings where the email notifications can be turned off
    const headers = process.env.FRONTEND_URL
      ? { 'List-Unsubscribe': `<${settingsUrl}>` }
      : undefined;

    const brandName = process.env.EMAIL_FROM_NAME || 'Mamito';
    const siteUrl = process.env.FRONTEND_URL || 'https://mamito.fidellab.com';
    const modifiedHtml = `
    <div style="background:#fff5ee;padding:32px 16px;font-family:'Helvetica Neue',Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(255,106,43,0.12);">
        <tr>
          <td style="height:6px;background:linear-gradient(90deg,#ff8a0b,#ff5b51);background-color:#ff6a2b;font-size:0;line-height:0;">&nbsp;</td>
        </tr>
        <tr>
          <td style="padding:28px 32px 0 32px;">
            <a href="${siteUrl}" style="text-decoration:none;display:inline-block;">
              <img src="${siteUrl}/android-chrome-192x192.png" width="40" height="40" alt="${brandName}" style="vertical-align:middle;border:0;" />
              <span style="vertical-align:middle;font-size:20px;font-weight:700;color:#1f2430;margin-left:8px;">${brandName}</span>
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 8px 32px;">
            <h1 style="font-size:24px;line-height:1.3;font-weight:700;margin:0 0 16px 0;color:#1f2430;">${subject}</h1>
            <div style="font-size:15px;line-height:1.6;color:#3f4654;">
              ${html}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 28px 32px;border-top:1px solid #f1e6de;font-size:12px;line-height:1.6;color:#8a8f99;">
            You can change your notification preferences in your <a href="${settingsUrl}" style="color:#e8561a;">account settings</a>.<br />
            ${brandName} by FidelLab &middot; Bole, Addis Ababa, Ethiopia &middot;
            <a href="${siteUrl}/terms" style="color:#8a8f99;">Terms</a> &middot;
            <a href="${siteUrl}/privacy" style="color:#8a8f99;">Privacy</a> &middot;
            <a href="mailto:support@fidellab.com" style="color:#8a8f99;">support@fidellab.com</a>
          </td>
        </tr>
      </table>
    </div>
    `;

    let lastErr: unknown;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const sends = await this.emailService.sendEmail(
          to,
          subject,
          modifiedHtml,
          process.env.EMAIL_FROM_NAME,
          process.env.EMAIL_FROM_ADDRESS,
          replyTo,
          headers
        );
        console.log(sends);
        return;
      } catch (err) {
        lastErr = err;
        console.log(`Email attempt ${attempt + 1}/3 failed:`, err);
        if (attempt < 2) {
          await timer(700);
        }
      }
    }
    console.log(`Email to ${to} failed after 3 attempts:`, lastErr);
  }
}

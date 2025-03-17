import { IEmailService } from '../../domain/interface/services/emailServices'
import nodemailer, { Transporter } from "nodemailer";

export class EmailServiceImpl implements IEmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to,
      subject,
      text,
    };
    await this.transporter.sendMail(mailOptions);
  }
}




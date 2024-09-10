import nodemailer from 'nodemailer'
import { Options } from "nodemailer/lib/mailer";
import Mailgen from "mailgen";
import { IUser } from "../schemas/userModel";

export class EmailService {

  private createTransporter() {
    return nodemailer.createTransport({
      port: +process.env.EMAIL_PORT!,
      host: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  private generateTemplate(user: IUser, token: string) {

    const mailGenerator = new Mailgen({
      theme: 'salted',
      product: {
        name: 'EQ Master',
        link: process.env.CLIENT_URL as string,
        // logo: "https://cdn-icons-png.flaticon.com/512/4838/4838856.png"
      },
    })

    const email: Mailgen.Content = {
      body: {
        greeting: "Witaj",
        name: user.name,
        intro: 'Zresetuj hasło',
        action: {
          instructions: 'Wciśnij przycisk poniżej aby zresetować hasło',
          button: {
            color: '#33b5e5',
            text: 'Zresetuj hasło',
            link: `${process.env.CLIENT_URL}/auth/reset-password?token=${token}`,
          },
        },
      },
    }

    return mailGenerator.generate(email);
  }

  public sendMail(user: IUser, subject: string, token: string) {
    const transporter = this.createTransporter();
    const email = this.generateTemplate(user, token);
    const options: Options = {
      from: process.env.EMAIL_FROM,
      html: email,
      to: user.email,
      subject,
    }

    return transporter.sendMail(options);
  }
}
import nodemailer, { Transporter } from 'nodemailer'

const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass:process.env.EMAIL_PASSWORD
    }
})

export const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
    const mailOption = {
        from: process.env.EMAIL_ID,
        to,
        subject,
        text
    }
    await transporter.sendMail(mailOption)
}
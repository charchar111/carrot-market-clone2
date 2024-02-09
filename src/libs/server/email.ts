import nodemailer from "nodemailer";
import { ISendNodeMail } from "../types";

const transporter = nodemailer.createTransport({
  host: "smtp.naver.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_SENDER_ID,
    pass: process.env.NODEMAILER_SENDER_PASSWORD,
  },
  // tls: {
  //   rejectUnauthorized: false,
  //   },
});

export async function sendNodeMail({ text, to, subject }: ISendNodeMail) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_SENDER_ID,
      to,
      subject,
      text,
    });

    transporter.close();

    return info;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

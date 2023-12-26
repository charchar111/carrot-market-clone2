import { Twilio } from "twilio";

interface ISendSMSTwilio {
  body: string;
  to: string;
}

const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

export const sendSMSTwilio = async function ({ body, to }: ISendSMSTwilio) {
  const sendMail = await twilioClient.messages.create({
    body,
    to,
    messagingServiceSid: process.env.TWILIO_SERVICE_MESSAGING_SID,
  });
  return sendMail;
};

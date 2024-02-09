import client from "@/libs/server/client";
import { sendNodeMail } from "@/libs/server/email";
import { sendSMSTwilio } from "@/libs/server/sms-twilio";
import withAPIhandler from "@/libs/server/withAPIhandler";
import { responseType } from "@/libs/types";
import { NextApiRequest, NextApiResponse } from "next";
import { Twilio } from "twilio";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>,
) {
  const { email, phone } = req.body;
  const userAddress = phone ? { phone } : email ? { email } : null;
  if (!userAddress)
    return res.status(400).json({
      ok: false,
      error: {
        message: "잘못된 요청입니다. 폰 번호 혹은 이메일을 입력해주세요",
      },
    });

  if (phone) {
    if (isNaN(Number(phone)))
      return res.status(400).json({
        ok: false,
        error: { message: "잘못된 요청입니다. 폰 번호는 숫자이어야 합니다." },
      });
  }

  const payload = Math.floor(Math.random() * 90000000 + 10000000);
  const token = await client.token.create({
    data: {
      payload: payload + "",
      user: {
        connectOrCreate: {
          where: { ...userAddress },
          create: {
            ...userAddress,
            name: "anon",
          },
        },
      },
    },
  });

  await client.user.update({
    where: { ...userAddress },
    data: { tokens: { deleteMany: { NOT: { payload: payload + "" } } } },
  });

  // twilio 토큰 인증 api, 비용 절감 위해 주석 처리

  console.log(userAddress.phone);
  // if (phone)
  //   await sendSMSTwilio({
  //     body: `캐럿마켓 서비스 클론입니다.\n로그인 토큰은 ${payload} 입니다.`,
  //     to: "+82" + userAddress.phone,
  //   });

  // twilio 토큰 인증 api, 비용 절감 위해 주석 처리
  // if (email) {
  //   const sendMail = await sendNodeMail({
  //     to: userAddress.email,
  //     subject: "캐럿마켓 클론 인증 토큰입니다.",
  //     text: `캐럿마켓 클론 인증 토큰입니다.\n${payload}`,
  //   });
  //   console.log("sendMail", sendMail);
  // }

  console.log("token", token);

  return res.status(200).json({ ok: true });
}

export default withAPIhandler({ handler, method: ["POST"], isPrivated: false });

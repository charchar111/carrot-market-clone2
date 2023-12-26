import client from "@/libs/server/client";
import { sendNodeMail } from "@/libs/server/email";
import { sendSMSTwilio } from "@/libs/server/sms-twilio";
import withAPIhandler from "@/libs/server/withAPIhandler";
import withApiSession from "@/libs/server/withApiSession";
import { NextApiRequest, NextApiResponse } from "next";
import { Twilio } from "twilio";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>,
) {
  const { token } = req.body;
  console.log("token", token);

  if (token) {
    const foundToken = await client.token.findUnique({
      where: { payload: token },
    });

    if (!foundToken)
      return res
        .status(404)
        .json({ ok: false, error: { message: "토큰이 일치하지 않습니다." } });

    req.session.user = { id: foundToken?.userId };
    await req.session.save();
    await client.token.deleteMany({ where: { userId: foundToken?.userId } });
    return res.status(200).json({ ok: true });
  }

  return res.status(400).json({ ok: false });
}

export default withApiSession(
  withAPIhandler({ handler, method: "POST", isPrivated: false }),
);

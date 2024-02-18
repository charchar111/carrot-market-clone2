import client from "@/libs/server/client";
import withAPIhandler from "@/libs/server/withAPIhandler";
import withApiSession from "@/libs/server/withApiSession";
import { responseType } from "@/libs/types";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>,
) {
  if (req.method == "POST") {
    if (!req.query?.id || isNaN(+req.query.id))
      return res.status(400).json({ ok: false });

    await client.message.create({
      data: {
        stream: { connect: { id: +req.query.id.toString() } },
        content: req.body.content,
        user: { connect: { id: req.session.user?.id! } },
      },
    });

    return res.status(200).json({ ok: true });
  }
}

export default withApiSession(withAPIhandler({ handler, method: ["POST"] }));

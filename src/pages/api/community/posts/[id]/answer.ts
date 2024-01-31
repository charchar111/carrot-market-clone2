import client from "@/libs/server/client";
import withAPIhandler from "@/libs/server/withAPIhandler";
import withApiSession from "@/libs/server/withApiSession";
import { responseType } from "@/libs/types";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>,
) {
  const {
    body: { answer },
    query: { id },
    session: { user },
  } = req;
  if (!id || !answer) return res.status(400).json({ ok: false });

  const post = await client.post.findUnique({ where: { id: +id.toString() } });
  if (!post) return res.status(404).json({ ok: false });
  await client.answer.create({
    data: {
      content: answer,
      post: { connect: { id: +id.toString() } },
      user: { connect: { id: user?.id } },
    },
  });

  return res.status(200).json({ ok: true });
}

export default withApiSession(withAPIhandler({ handler, method: ["POST"] }));

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
    query: { id },
    session: { user },
  } = req;
  if (!id) return res.status(400).json({ ok: false });

  const aleadyWondering = await client.wondering.findFirst({
    where: { user: { id: user?.id }, post: { id: +id.toString() } },
    select: { id: true },
  });

  console.log("aleadyWondering", aleadyWondering);

  if (aleadyWondering) {
    await client.wondering.delete({
      where: { id: aleadyWondering.id },
    });

    return res.status(200).json({ ok: true });
  } else {
    await client.wondering.create({
      data: {
        post: { connect: { id: +id.toString() } },
        user: { connect: { id: user?.id } },
      },
    });

    return res.status(200).json({ ok: true });
  }
}

export default withApiSession(withAPIhandler({ handler, method: ["POST"] }));

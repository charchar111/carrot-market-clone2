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

  const aleadyFavorite = await client.record.findFirst({
    where: { user: { id: user?.id }, product: { id: +id.toString() } },
    select: { id: true },
  });

  console.log("aleadyFavorite", aleadyFavorite);

  if (aleadyFavorite) {
    await client.record.delete({
      where: { id: aleadyFavorite.id },
    });

    return res.status(200).json({ ok: true });
  } else {
    await client.record.create({
      data: {
        kind: "FAVORITE",
        product: { connect: { id: +id.toString() } },
        user: { connect: { id: user?.id } },
      },
    });

    return res.status(200).json({ ok: true });
  }
}

export default withApiSession(withAPIhandler({ handler, method: ["POST"] }));

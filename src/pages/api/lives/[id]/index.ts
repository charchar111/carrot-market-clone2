import client from "@/libs/server/client";
import withAPIhandler from "@/libs/server/withAPIhandler";
import withApiSession from "@/libs/server/withApiSession";
import { responseType } from "@/libs/types";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>,
) {
  if (req.method == "GET") {
    if (!req.query?.id || isNaN(+req.query.id))
      return res.status(400).json({ ok: false });

    const live = await client.stream.findUnique({
      where: { id: +req.query?.id?.toString() },
      include: { Messages: { orderBy: { createdAt: "asc" } } },
    });

    return res.status(200).json({ ok: true, live });
  }
}

export default withApiSession(withAPIhandler({ handler, method: ["GET"] }));

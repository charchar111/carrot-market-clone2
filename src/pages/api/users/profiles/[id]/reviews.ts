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
  } = req;
  if (!id) return res.status(401).json({ ok: false });

  const reviews = await client.review.findMany({
    where: { createdFor: { id: req.session.user?.id! } },
    include: { createdBy: { select: { name: true, avatar: true, id: true } } },
  });

  console.log("reviews", reviews);

  return res.status(200).json({ ok: true, reviews });
}

export default withApiSession(withAPIhandler({ handler, method: ["GET"] }));

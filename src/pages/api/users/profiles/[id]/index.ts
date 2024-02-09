import client from "@/libs/server/client";
import withAPIhandler from "@/libs/server/withAPIhandler";
import withApiSession from "@/libs/server/withApiSession";
import { responseType } from "@/libs/types";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>,
) {
  if (!req.query.id) return res.status(401).json({ ok: false });

  const user = await client.user.findUnique({
    where: { id: +req.query.id.toString() },
    select: {
      id: true,
      name: true,
      avatar: true,
      Products: true,
      Records: { where: { kind: "SALE" } },
    },
  });

  if (!user) return res.status(404).json({ ok: false });

  return res.status(200).json({ ok: true, profile: user });
}

export default withApiSession(withAPIhandler({ handler, method: ["GET"] }));

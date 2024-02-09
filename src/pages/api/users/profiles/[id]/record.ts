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
    query: { id, kind },
  } = req;

  if (!id || id == "undefined") return res.status(401).json({ ok: false });

  switch (kind) {
    case "sell": {
      const record = await client.record.findMany({
        where: { user: { id: +id.toString() }, kind: "SALE" },
        include: {
          product: {
            include: {
              _count: { select: { Records: { where: { kind: "FAVORITE" } } } },
            },
          },
        },
      });

      return res.status(200).json({ ok: true, record });
    }
  }
}

export default withApiSession(withAPIhandler({ handler, method: ["GET"] }));

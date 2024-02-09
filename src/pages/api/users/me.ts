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
    session: { user },
    query: { kind },
  } = req;

  let flashMessage;
  if (req.session.message) {
    flashMessage = req.session.message;
    req.session.message = null;
    await req.session.save();
  }

  switch (String(kind).toLowerCase()) {
    case "buy": {
      const record = await client.record.findMany({
        where: {
          userId: user?.id,
          kind: "PURCHASE",
        },
        include: {
          product: {
            include: {
              _count: { select: { Records: { where: { kind: "FAVORITE" } } } },
            },
          },
        },
      });
      return res.status(200).json({ ok: true, record, flashMessage });
      break;
    }
    case "favorite": {
      const record = await client.record.findMany({
        where: {
          userId: user?.id,
          kind: "FAVORITE",
        },
        include: {
          product: {
            include: {
              _count: { select: { Records: { where: { kind: "FAVORITE" } } } },
            },
          },
        },
      });
      return res.status(200).json({ ok: true, record, flashMessage });
      break;
    }

    // kind=undefined
    default: {
      const foundUser = await client.user.findUnique({
        where: { id: req.session?.user?.id },
        select: { id: true },
      });

      if (!foundUser) return res.status(401).json({ ok: false });

      return res
        .status(200)
        .json({ ok: true, profile: foundUser, flashMessage });
      break;
    }
  }
}

export default withApiSession(withAPIhandler({ handler, method: ["GET"] }));

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
    const live = await client.stream.findMany({
      where: {},
      select: {
        id: true,
        name: true,
        createdAt: true,
        price: true,
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      // take: 5
    });

    return res.status(200).json({ ok: true, live });
  }

  if (req.method == "POST") {
    const {
      session: { user },
      body: { name, price, description },
    } = req;

    if (!name || !price || isNaN(Number(price)))
      return res.status(400).json({ ok: false });

    const stream = await client.stream.create({
      data: {
        name,
        price: +price,
        description,
        user: { connect: { id: user?.id! } },
      },
      select: { id: true },
    });

    req.session.message = "영상이 성공적으로 등록되었습니다.";
    await req.session.save();
    return res.status(201).json({ ok: true, stream });
  }
}

export default withApiSession(
  withAPIhandler({ handler, method: ["GET", "POST"] }),
);

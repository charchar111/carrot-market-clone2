import { ITEM_PER_PAGE } from "@/libs/constant";
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
    const page = String(req.query.page).trim();
    if (page === "" || isNaN(+page) || +page <= 0 || Number(page) % 1 !== 0)
      return res.status(400).json({ ok: false });

    console.log("page", page);

    // await new Promise((res) => {
    //   setTimeout(res, 2000);
    // });

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
      take: ITEM_PER_PAGE,
      skip: (+page - 1) * ITEM_PER_PAGE,
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

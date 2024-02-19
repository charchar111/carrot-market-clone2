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
    const count = await client.product.count({});
    const products = await client.product.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        price: true,
        image: true,
        _count: { select: { Records: { where: { kind: "FAVORITE" } } } },
      },
      orderBy: { id: "desc" },
      take: 25,
      skip: ITEM_PER_PAGE * (+page - 1),
    });

    return res.status(200).json({ ok: true, products, count });
  }

  if (req.method == "POST") {
    const {
      session: { user },
      body: { name, description, image, price, latitude, longitude },
    } = req;

    console.log("upload product", image);

    if (!name || !price || isNaN(Number(price)))
      return res.status(400).json({ ok: false });

    await client.product.create({
      data: {
        price: +price,
        name,
        description,
        image: "",
        user: { connect: { id: user?.id } },
        latitude: latitude || null,
        longitude: longitude || null,
      },
    });

    req.session.message = "상품이 성공적으로 등록되었습니다.";
    await req.session.save();
    return res.status(201).json({ ok: true });
  }
}

export default withApiSession(
  withAPIhandler({ handler, method: ["GET", "POST"] }),
);

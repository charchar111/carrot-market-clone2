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
    const id = req.query.id;
    if (!id) return res.status(400).json({ ok: false });
    const product = await client.product.findUnique({
      where: {
        id: +id.toString(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: { select: { Records: { where: { kind: "FAVORITE" } } } },
      },
    });
    let term;
    let relatedProduct;
    if (product) {
      term = product.name
        .split(" ")
        .map((element) => ({ name: { contains: element } }));
      relatedProduct = await client.product.findMany({
        where: {
          OR: term,
          AND: { NOT: { id: product?.id } },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      });
    }

    const isExistFavorite = Boolean(
      await client.record.findFirst({
        where: { userId: req.session.user?.id, productId: +id.toString() },
      }),
    );

    return res
      .status(200)
      .json({ ok: true, product, relatedProduct, isExistFavorite });
  }
}

export default withApiSession(withAPIhandler({ handler, method: ["GET"] }));

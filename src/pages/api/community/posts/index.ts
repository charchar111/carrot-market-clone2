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
    const { latitude, longitude } = req.query;

    let parsedLatitude;
    let parsedLongitude;
    if (latitude && longitude) {
      parsedLatitude = parseFloat(latitude?.toString());
      parsedLongitude = parseFloat(longitude.toString());
    }
    const posts = await client.post.findMany({
      where: {
        latitude:
          !parsedLatitude || !parsedLongitude
            ? null
            : { gte: parsedLatitude - 0.01, lte: parsedLatitude + 0.01 },
        longitude:
          !parsedLatitude || !parsedLongitude
            ? null
            : { gte: parsedLongitude - 0.01, lte: parsedLongitude + 0.01 },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        user: { select: { name: true } },
        _count: { select: { Wonderings: true, Answers: true } },
      },
      orderBy: { createdAt: "desc" },
      // take: 5
    });

    return res.status(200).json({ ok: true, posts });
  }

  if (req.method == "POST") {
    const {
      session: { user },
      body: { title, content, latitude, longitude },
    } = req;

    if (!title) return res.status(400).json({ ok: false });

    await client.post.create({
      data: {
        title,
        content,
        user: { connect: { id: user?.id } },
        latitude: latitude || null,
        longitude: longitude || null,
      },
    });

    req.session.message = "글이 성공적으로 등록되었습니다.";
    await req.session.save();
    return res.status(201).json({ ok: true });
  }
}

export default withApiSession(
  withAPIhandler({ handler, method: ["GET", "POST"] }),
);

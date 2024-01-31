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
    const post = await client.post.findUnique({
      where: { id: +id.toString() },
      include: {
        user: true,
        _count: { select: { Wonderings: true, Answers: true } },
        Answers: {
          select: {
            createdAt: true,
            content: true,
            id: true,
            user: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
    });

    if (!post) return res.status(404).json({ ok: false });

    const isExistWondering = Boolean(
      await client.wondering.findFirst({
        where: { userId: req.session.user?.id, postId: +id.toString() },
      }),
    );

    return res.status(200).json({ ok: true, post, isExistWondering });
  }
}

export default withApiSession(withAPIhandler({ handler, method: ["GET"] }));

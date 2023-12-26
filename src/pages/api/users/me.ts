import client from "@/libs/server/client";
import withAPIhandler from "@/libs/server/withAPIhandler";
import withApiSession from "@/libs/server/withApiSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>,
) {
  console.log("user", req.session.user);

  const foundUser = await client.user.findUnique({
    where: { id: req.session?.user?.id },
  });

  if (!foundUser) return res.status(401).json({ ok: false });
  return res.status(200).json({ ok: true });
}

export default withApiSession(withAPIhandler({ handler, method: "GET" }));

import client from "@/libs/server/client";
import withAPIhandler from "@/libs/server/withAPIhandler";
import withApiSession from "@/libs/server/withApiSession";
import { responseType } from "@/libs/types";
import { NextApiRequest, NextApiResponse } from "next";

interface IupdateData {
  name?: string;
  email?: string;
  phone?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>,
) {
  switch (req.method) {
    case "GET": {
      if (!req.session.user?.id) return res.status(401).json({ ok: false });

      const user = await client.user.findUnique({
        where: { id: +req.session.user?.id },
        select: {
          id: true,
          name: true,
          avatar: true,

          email: true,
          phone: true,
        },
      });

      if (!user) return res.status(401).json({ ok: false });

      return res.status(200).json({ ok: true, profile: user });
      break;
    }
    case "POST": {
      const {
        body: { name, phone, email },
        session: { user },
      } = req;
      console.log("profile edit", name, phone, email);

      let updateData: IupdateData = {};

      if (!(email || phone))
        return res.status(400).json({
          ok: false,
          error: {
            message: "휴대폰 번호와 이메일 중 하나는 반드시 입력해야 합니다.",
          },
        });

      const myUser = await client.user.findUnique({ where: { id: user?.id } });
      if (!myUser)
        return res.status(404).json({
          ok: false,
          error: {
            message: "유저정보를 찾을 수 없습니다.",
          },
        });

      if (name && myUser.name !== name) {
        updateData.name = name;
      }

      if (email && myUser.email !== email) {
        const existEmail = Boolean(
          await client.user.findUnique({ where: { email } }),
        );
        if (existEmail)
          return res.status(400).json({
            ok: false,
            error: {
              message: "이미 존재하는 이메일입니다.",
            },
          });

        updateData.email = email;
      }

      if (phone && myUser.phone !== phone) {
        const existPhone = Boolean(
          await client.user.findUnique({ where: { phone } }),
        );
        if (existPhone)
          return res.status(400).json({
            ok: false,
            error: {
              message: "이미 존재하는 휴대폰번호입니다.",
            },
          });

        updateData.phone = phone;
      }

      console.log(updateData);

      if (Object.keys(updateData).length > 0)
        await client.user.update({ where: { id: user?.id }, data: updateData });

      return res.status(200).json({ ok: true });
      break;
    }
    default:
      return res.status(400).json({ ok: false });
  }
}

export default withApiSession(
  withAPIhandler({ handler, method: ["GET", "POST"] }),
);

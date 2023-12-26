import { NextApiRequest, NextApiResponse } from "next";

export default function withAPIhandler({
  handler,
  method,
  isPrivated = true,
}: IWithAPIhandler) {
  console.log("global", global.client);

  return async function (
    req: NextApiRequest,
    res: NextApiResponse<responseType>,
  ) {
    if (req.method !== method) return res.status(405).json({ ok: false });
    if (isPrivated && !req.session.user)
      return res.status(401).json({ ok: false });

    try {
      await handler(req, res);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        error: {
          message: "서버에서 에러가 발생했습니다. 잠시 후 다시 시도해주십시오.",
        },
      });
    }
  };
}
// api 요청의 기본 유효성 검사

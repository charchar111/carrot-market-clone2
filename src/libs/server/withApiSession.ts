import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: { id: number };
    message: string | null;
  }
}

export default function withApiSession(handler: any) {
  const sessionOption = {
    cookieName: "carrot-market-authorize",
    password: process.env.IRON_SESSION_OPTION_PASSWORD!,
  };

  return withIronSessionApiRoute(handler, sessionOption);
}

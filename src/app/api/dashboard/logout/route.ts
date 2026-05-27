import { NextResponse } from "next/server";
import { DASH_COOKIE } from "@/lib/dashboard-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const res = NextResponse.redirect(`${origin}/dashboard/login`, 303);
  res.cookies.set(DASH_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

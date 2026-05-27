import { NextResponse } from "next/server";
import {
  DASH_COOKIE,
  checkPassword,
  expectedToken,
  isDashboardConfigured,
} from "@/lib/dashboard-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;

  if (!isDashboardConfigured()) {
    return NextResponse.redirect(`${origin}/dashboard/login?error=config`, 303);
  }

  const form = await request.formData();
  const senha = String(form.get("senha") ?? "");

  if (!checkPassword(senha)) {
    return NextResponse.redirect(`${origin}/dashboard/login?error=1`, 303);
  }

  const res = NextResponse.redirect(`${origin}/dashboard`, 303);
  res.cookies.set(DASH_COOKIE, expectedToken() as string, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });
  return res;
}

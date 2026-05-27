import { createHash } from "crypto";
import { cookies } from "next/headers";

export const DASH_COOKIE = "platinuss_dash";

const PASSWORD = process.env.DASHBOARD_PASSWORD;

export function isDashboardConfigured() {
  return Boolean(PASSWORD);
}

// Token derivado da senha: quem souber a senha gera o mesmo token,
// e a senha em si nunca fica salva no cookie.
export function expectedToken(): string | null {
  if (!PASSWORD) return null;
  return createHash("sha256").update(`platinuss::${PASSWORD}`).digest("hex");
}

export function checkPassword(input: string): boolean {
  return Boolean(PASSWORD) && input === PASSWORD;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = expectedToken();
  if (!token) return false;
  const jar = await cookies();
  return jar.get(DASH_COOKIE)?.value === token;
}

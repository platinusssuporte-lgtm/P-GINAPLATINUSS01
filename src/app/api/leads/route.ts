import { NextResponse } from "next/server";
import { insertLead, isSupabaseConfigured, type NewLead } from "@/lib/supabase";
import { isZapiConfigured, notifyComercial } from "@/lib/zapi";
import { buildLeadMessage } from "@/lib/leads-stats";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FIELDS: (keyof NewLead)[] = [
  "nome",
  "telefone",
  "email",
  "empresa",
  "faturamento",
  "tem_site",
  "gargalo",
  "utm_source",
  "utm_medium",
  "utm_campaign",
];

function clean(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, 2000);
  return trimmed.length ? trimmed : null;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const lead: Partial<NewLead> = {};
  for (const field of FIELDS) {
    lead[field] = clean(body[field]);
  }

  if (!lead.nome && !lead.telefone && !lead.email) {
    return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });
  }

  // Salva no banco e avisa o comercial em paralelo. Um não derruba o outro.
  const [insertRes, notifyRes] = await Promise.allSettled([
    isSupabaseConfigured()
      ? insertLead(lead)
      : Promise.reject(new Error("supabase_not_configured")),
    isZapiConfigured()
      ? notifyComercial(buildLeadMessage(lead))
      : Promise.reject(new Error("zapi_not_configured")),
  ]);

  if (insertRes.status === "rejected") {
    console.error("[api/leads] banco:", insertRes.reason);
  }
  if (notifyRes.status === "rejected") {
    console.error("[api/leads] z-api:", notifyRes.reason);
  }

  const saved = insertRes.status === "fulfilled";
  const notified = notifyRes.status === "fulfilled";

  // Sucesso se ao menos uma das ações deu certo (o lead não se perde).
  if (!saved && !notified) {
    return NextResponse.json({ ok: false, saved, notified }, { status: 500 });
  }
  return NextResponse.json({ ok: true, saved, notified });
}

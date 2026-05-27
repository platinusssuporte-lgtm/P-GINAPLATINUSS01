import { NextResponse } from "next/server";
import { insertLead, isSupabaseConfigured, type NewLead } from "@/lib/supabase";

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
  if (!isSupabaseConfigured()) {
    // Não derruba o fluxo do usuário: o WhatsApp já foi aberto no cliente.
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

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

  try {
    await insertLead(lead);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/leads] insert error:", err);
    return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
  }
}

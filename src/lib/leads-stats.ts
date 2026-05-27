import type { Lead } from "@/lib/supabase";

export const FATURAMENTO_LABELS: Record<string, string> = {
  "ate-30k": "Até R$30k",
  "30k-50k": "R$30k–50k",
  "50k-100k": "R$50k–100k",
  "100k-300k": "R$100k–300k",
  "300k+": "Acima de R$300k",
};

export const FATURAMENTO_ORDER = [
  "ate-30k",
  "30k-50k",
  "50k-100k",
  "100k-300k",
  "300k+",
];

export const TEM_SITE_LABELS: Record<string, string> = {
  "sim-nao-vende": "Tem, mas não vende",
  "sim-desatualizado": "Tem, mas desatualizado",
  nao: "Não tem site",
};

export const TEM_SITE_ORDER = ["nao", "sim-nao-vende", "sim-desatualizado"];

export function label(map: Record<string, string>, key: string | null): string {
  if (!key) return "Não informado";
  return map[key] ?? key;
}

// Mensagem de WhatsApp enviada ao comercial quando chega um lead novo.
export function buildLeadMessage(lead: Partial<Lead>): string {
  const lines = [
    "🚀 *Novo lead pelo site Platinuss*",
    "",
    `*Nome:* ${lead.nome ?? "—"}`,
    `*WhatsApp:* ${lead.telefone ?? "—"}`,
    `*E-mail:* ${lead.email ?? "—"}`,
    `*Empresa:* ${lead.empresa ?? "—"}`,
    `*Faturamento:* ${label(FATURAMENTO_LABELS, lead.faturamento ?? null)}`,
    `*Já tem site?* ${label(TEM_SITE_LABELS, lead.tem_site ?? null)}`,
    `*Maior problema:* ${lead.gargalo ?? "—"}`,
  ];

  const origem = [lead.utm_source, lead.utm_medium, lead.utm_campaign]
    .filter(Boolean)
    .join(" / ");
  if (origem) lines.push("", `*Origem:* ${origem}`);

  return lines.join("\n");
}

export type Bucket = { key: string; label: string; count: number };

export function countBy(
  leads: Lead[],
  field: keyof Lead,
  order: string[],
  labels: Record<string, string>,
): Bucket[] {
  const counts = new Map<string, number>();
  for (const lead of leads) {
    const v = (lead[field] as string | null) ?? "__none__";
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  const buckets: Bucket[] = order
    .filter((k) => counts.has(k))
    .map((k) => ({ key: k, label: labels[k] ?? k, count: counts.get(k) ?? 0 }));
  if (counts.has("__none__")) {
    buckets.push({ key: "__none__", label: "Não informado", count: counts.get("__none__") ?? 0 });
  }
  // Inclui chaves fora da ordem prevista, se houver.
  for (const [k, c] of counts) {
    if (k !== "__none__" && !order.includes(k)) {
      buckets.push({ key: k, label: labels[k] ?? k, count: c });
    }
  }
  return buckets;
}

// Série diária dos últimos `days` dias (mais antigo -> mais recente).
export function dailySeries(leads: Lead[], days = 14): { date: string; count: number }[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const series: { date: string; count: number }[] = [];
  const byDay = new Map<string, number>();
  for (const lead of leads) {
    const d = new Date(lead.created_at);
    const key = d.toISOString().slice(0, 10);
    byDay.set(key, (byDay.get(key) ?? 0) + 1);
  }
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    series.push({ date: key, count: byDay.get(key) ?? 0 });
  }
  return series;
}

export function summary(leads: Lead[]) {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  let hoje = 0;
  let ultimos7 = 0;
  let semSite = 0;
  for (const lead of leads) {
    const t = new Date(lead.created_at).getTime();
    if (t >= startOfToday.getTime()) hoje++;
    if (now - t <= 7 * day) ultimos7++;
    if (lead.tem_site === "nao") semSite++;
  }
  return {
    total: leads.length,
    hoje,
    ultimos7,
    semSite,
    semSitePct: leads.length ? Math.round((semSite / leads.length) * 100) : 0,
  };
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function whatsappLink(telefone: string | null): string | null {
  if (!telefone) return null;
  const digits = telefone.replace(/\D/g, "");
  if (digits.length < 10) return null;
  const withCountry = digits.length <= 11 ? `55${digits}` : digits;
  return `https://wa.me/${withCountry}`;
}

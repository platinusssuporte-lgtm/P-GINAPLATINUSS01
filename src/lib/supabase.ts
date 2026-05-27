// Acesso ao Supabase via REST API (PostgREST), sem dependências extras.
// A chave secreta SÓ é usada no servidor (route handlers / server components).
// Nunca importe este arquivo em componentes "use client".

const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

export type Lead = {
  id: string;
  created_at: string;
  nome: string | null;
  telefone: string | null;
  email: string | null;
  empresa: string | null;
  faturamento: string | null;
  tem_site: string | null;
  gargalo: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

export type NewLead = Omit<Lead, "id" | "created_at">;

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_SECRET_KEY);
}

function headers() {
  return {
    apikey: SUPABASE_SECRET_KEY as string,
    Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
    "Content-Type": "application/json",
  };
}

export async function insertLead(lead: Partial<NewLead>): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase não configurado (SUPABASE_URL / SUPABASE_SECRET_KEY).");
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: { ...headers(), Prefer: "return=minimal" },
    body: JSON.stringify(lead),
    cache: "no-store",
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Supabase insert falhou (${res.status}): ${detail}`);
  }
}

export async function listLeads(limit = 1000): Promise<Lead[]> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase não configurado (SUPABASE_URL / SUPABASE_SECRET_KEY).");
  }
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/leads?select=*&order=created_at.desc&limit=${limit}`,
    { headers: headers(), cache: "no-store" },
  );
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Supabase select falhou (${res.status}): ${detail}`);
  }
  return (await res.json()) as Lead[];
}

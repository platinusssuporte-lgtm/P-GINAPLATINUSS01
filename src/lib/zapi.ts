// Envio de WhatsApp pelo Z-API (https://z-api.io) — usado no backend para
// avisar o comercial assim que um lead preenche o formulário.
// Credenciais ficam só em variáveis de ambiente, nunca no código.

const INSTANCE_ID = process.env.ZAPI_INSTANCE_ID;
const INSTANCE_TOKEN = process.env.ZAPI_INSTANCE_TOKEN;
const CLIENT_TOKEN = process.env.ZAPI_CLIENT_TOKEN;
const NOTIFY_PHONE = process.env.ZAPI_NOTIFY_PHONE;
const NOTIFY_GROUP_ID = process.env.ZAPI_NOTIFY_GROUP_ID;

export function isZapiConfigured(): boolean {
  return Boolean(INSTANCE_ID && INSTANCE_TOKEN && (NOTIFY_GROUP_ID || NOTIFY_PHONE));
}

// Aceita o número do comercial em qualquer formato e deixa só os dígitos.
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // Se vier sem código do país (10 ou 11 dígitos), assume Brasil (55).
  if (digits.length <= 11) return `55${digits}`;
  return digits;
}

// Destino do aviso: o grupo do comercial tem prioridade; senão, o número direto.
function notifyTarget(): string {
  if (NOTIFY_GROUP_ID) return NOTIFY_GROUP_ID.trim();
  return normalizePhone(NOTIFY_PHONE as string);
}

export async function notifyComercial(message: string): Promise<void> {
  if (!isZapiConfigured()) {
    throw new Error("Z-API não configurado (ZAPI_INSTANCE_ID / ZAPI_INSTANCE_TOKEN / ZAPI_NOTIFY_PHONE).");
  }

  const url = `https://api.z-api.io/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}/send-text`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (CLIENT_TOKEN) headers["Client-Token"] = CLIENT_TOKEN;

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      phone: notifyTarget(),
      message,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Z-API falhou (${res.status}): ${detail}`);
  }
}

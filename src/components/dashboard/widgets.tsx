import type { Lead } from "@/lib/supabase";
import {
  type Bucket,
  FATURAMENTO_LABELS,
  TEM_SITE_LABELS,
  formatDateTime,
  label,
  whatsappLink,
} from "@/lib/leads-stats";

export function StatCard({
  value,
  title,
  hint,
}: {
  value: string | number;
  title: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-sm text-muted">{title}</p>
      <p className="mt-2 text-3xl font-medium text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function BarChart({ title, buckets }: { title: string; buckets: Bucket[] }) {
  const max = Math.max(1, ...buckets.map((b) => b.count));
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="mb-4 text-sm font-medium text-foreground">{title}</h2>
      {buckets.length === 0 ? (
        <p className="text-sm text-muted">Sem dados ainda.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {buckets.map((b) => (
            <div key={b.key} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">{b.label}</span>
                <span className="text-foreground">{b.count}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(b.count / max) * 100}%`,
                    backgroundColor: "var(--color-accent)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function DailyChart({
  title,
  series,
}: {
  title: string;
  series: { date: string; count: number }[];
}) {
  const max = Math.max(1, ...series.map((d) => d.count));
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="mb-4 text-sm font-medium text-foreground">{title}</h2>
      <div className="flex h-40 items-end gap-1">
        {series.map((d) => {
          const day = d.date.slice(8, 10);
          return (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t"
                  style={{
                    height: `${(d.count / max) * 100}%`,
                    minHeight: d.count > 0 ? 4 : 0,
                    backgroundColor:
                      d.count > 0 ? "var(--color-accent)" : "transparent",
                  }}
                  title={`${d.date}: ${d.count}`}
                />
              </div>
              <span className="text-[10px] text-muted">{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-sm font-medium text-foreground">Leads recebidos</h2>
        <span className="text-xs text-muted">{leads.length} no total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-sm">
          <thead>
            <tr className="border-y border-border text-left text-xs text-muted">
              <th className="px-5 py-3 font-normal">Data</th>
              <th className="px-5 py-3 font-normal">Nome</th>
              <th className="px-5 py-3 font-normal">WhatsApp</th>
              <th className="px-5 py-3 font-normal">E-mail</th>
              <th className="px-5 py-3 font-normal">Empresa</th>
              <th className="px-5 py-3 font-normal">Faturamento</th>
              <th className="px-5 py-3 font-normal">Tem site?</th>
              <th className="px-5 py-3 font-normal">Maior problema</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-8 text-center text-muted">
                  Nenhum lead recebido ainda.
                </td>
              </tr>
            ) : (
              leads.map((lead) => {
                const wa = whatsappLink(lead.telefone);
                return (
                  <tr key={lead.id} className="border-b border-border/60 align-top">
                    <td className="whitespace-nowrap px-5 py-3 text-muted">
                      {formatDateTime(lead.created_at)}
                    </td>
                    <td className="px-5 py-3 text-foreground">{lead.nome ?? "—"}</td>
                    <td className="whitespace-nowrap px-5 py-3">
                      {wa ? (
                        <a
                          href={wa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          {lead.telefone}
                        </a>
                      ) : (
                        <span className="text-muted">{lead.telefone ?? "—"}</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-muted">{lead.email ?? "—"}</td>
                    <td className="px-5 py-3 text-muted">{lead.empresa ?? "—"}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-muted">
                      {label(FATURAMENTO_LABELS, lead.faturamento)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-muted">
                      {label(TEM_SITE_LABELS, lead.tem_site)}
                    </td>
                    <td className="max-w-[260px] px-5 py-3 text-muted">{lead.gargalo ?? "—"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

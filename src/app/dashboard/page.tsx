import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/dashboard-auth";
import { isSupabaseConfigured, listLeads, type Lead } from "@/lib/supabase";
import {
  FATURAMENTO_LABELS,
  FATURAMENTO_ORDER,
  TEM_SITE_LABELS,
  TEM_SITE_ORDER,
  countBy,
  dailySeries,
  summary,
} from "@/lib/leads-stats";
import {
  BarChart,
  DailyChart,
  LeadsTable,
  StatCard,
} from "@/components/dashboard/widgets";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard de leads | Platinuss",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  if (!(await isAuthenticated())) redirect("/dashboard/login");

  let leads: Lead[] = [];
  let loadError: string | null = null;

  if (!isSupabaseConfigured()) {
    loadError =
      "Supabase não configurado. Defina SUPABASE_URL e SUPABASE_SECRET_KEY no servidor.";
  } else {
    try {
      leads = await listLeads();
    } catch (err) {
      loadError = err instanceof Error ? err.message : "Falha ao carregar leads.";
    }
  }

  const stats = summary(leads);
  const faturamento = countBy(leads, "faturamento", FATURAMENTO_ORDER, FATURAMENTO_LABELS);
  const temSite = countBy(leads, "tem_site", TEM_SITE_ORDER, TEM_SITE_LABELS);
  const serie = dailySeries(leads, 14);

  return (
    <main className="min-h-screen bg-background px-5 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-medium text-accent">Platinuss</span>
            <h1 className="text-2xl text-foreground md:text-3xl">Dashboard de leads</h1>
          </div>
          <form action="/api/dashboard/logout" method="post">
            <button
              type="submit"
              className="rounded-lg border border-border px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              Sair
            </button>
          </form>
        </header>

        {loadError && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {loadError}
          </p>
        )}

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard title="Total de leads" value={stats.total} />
          <StatCard title="Hoje" value={stats.hoje} />
          <StatCard title="Últimos 7 dias" value={stats.ultimos7} />
          <StatCard
            title="Não têm site"
            value={`${stats.semSitePct}%`}
            hint={`${stats.semSite} de ${stats.total} leads`}
          />
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DailyChart title="Leads por dia (últimos 14 dias)" series={serie} />
          <BarChart title="Faturamento mensal" buckets={faturamento} />
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <BarChart title="Já tem site hoje?" buckets={temSite} />
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h2 className="mb-2 text-sm font-medium text-foreground">Dica</h2>
            <p className="text-sm text-muted">
              Clique no número de WhatsApp na tabela abaixo para abrir a conversa
              direto. Os dados atualizam a cada vez que você recarrega a página.
            </p>
          </div>
        </section>

        <LeadsTable leads={leads} />
      </div>
    </main>
  );
}

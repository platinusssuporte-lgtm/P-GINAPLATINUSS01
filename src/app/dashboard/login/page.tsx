import { redirect } from "next/navigation";
import { isAuthenticated, isDashboardConfigured } from "@/lib/dashboard-auth";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthenticated()) redirect("/dashboard");

  const { error } = await searchParams;
  const configured = isDashboardConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8">
        <div className="mb-6 flex flex-col gap-1">
          <span className="text-sm font-medium text-accent">Platinuss</span>
          <h1 className="text-2xl text-foreground">Dashboard de leads</h1>
          <p className="text-sm text-muted">Acesso restrito.</p>
        </div>

        {!configured && (
          <p className="mb-4 rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted">
            Defina a variável de ambiente <code className="text-accent">DASHBOARD_PASSWORD</code>{" "}
            no servidor para liberar o acesso.
          </p>
        )}

        {(error === "1" || error === "config") && (
          <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error === "config"
              ? "Dashboard ainda não configurado no servidor."
              : "Senha incorreta. Tente novamente."}
          </p>
        )}

        <form action="/api/dashboard/login" method="post" className="flex flex-col gap-3">
          <input
            type="password"
            name="senha"
            required
            autoFocus
            placeholder="Senha"
            className="input-field"
            aria-label="Senha"
          />
          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

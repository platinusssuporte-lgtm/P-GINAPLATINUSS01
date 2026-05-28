export const metadata = {
  title: "Obrigado por preencher | Platinuss",
  description: "Recebemos seus dados. Em até 5 minutos a gente te chama no WhatsApp.",
};

export default function ObrigadoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16">
      <div className="animate-fade-up flex w-full max-w-xl flex-col items-center gap-6 rounded-2xl border border-border bg-surface px-6 py-12 text-center md:px-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-8 w-8"
            stroke="var(--color-accent)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-accent">Platinuss</span>
          <h1 className="text-3xl text-foreground md:text-4xl">
            Obrigado por preencher!
          </h1>
          <p className="text-base text-muted md:text-lg">
            Recebemos suas informações. Em até <strong className="text-foreground">5 minutos</strong>{" "}
            a nossa equipe vai te chamar no WhatsApp para entender seu negócio e
            montar o seu site.
          </p>
        </div>
      </div>
    </main>
  );
}

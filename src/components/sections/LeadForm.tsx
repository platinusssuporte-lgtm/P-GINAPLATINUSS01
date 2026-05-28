"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@/components/icons";

const CAROUSEL = [
  "/pages/home/carrosel_fotos/felipe.webp?v=3",
  "/pages/home/carrosel_fotos/pedro.webp?v=5",
  "/pages/home/carrosel_fotos/imagem_form.webp?v=4",
];

function SelectField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative w-full">
      <select
        name={name}
        aria-label={label}
        required
        defaultValue=""
        className="input-field appearance-none bg-surface pr-10 text-placeholder"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-primary">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-placeholder" />
    </div>
  );
}

export function LeadForm() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setActive((v) => (v + 1) % CAROUSEL.length),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const form = e.currentTarget;
    const payload = Object.fromEntries(
      new FormData(form).entries(),
    ) as Record<string, string>;

    // Captura UTMs da URL caso os campos ocultos estejam vazios.
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
        if (!payload[key]) payload[key] = params.get(key) ?? "";
      }
    }

    // Salva no banco e avisa o grupo do comercial (continua mesmo após sair da página).
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});

    // Leva o visitante para a página de agradecimento.
    router.push("/obrigado");
  }

  return (
    <section id="form" className="relative overflow-visible flex flex-col py-12 md:py-16 md:px-[100px] items-center justify-center overflow-hidden scroll-mt-25">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center z-0"
      >
        <div
          className="w-[220%] md:w-[1100px] h-[420px] md:h-[260px] mb-[200px] opacity-60"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 100%, rgba(112, 255, 227, 0.24) 0%, rgba(112, 255, 227, 0.18) 48%, transparent 72%)",
            transform: "rotate(-22deg)",
          }}
        />
      </div>

      <div className="section-container relative z-10 flex section-px flex-col md:flex-row items-center bg-surface/95 justify-center px-6 py-10 md:p-4 md:pr-16 gap-8 md:gap-16 md:rounded-2xl border border-border">
        {/* Image carousel */}
        <div className="relative w-full h-[763.1px] overflow-hidden rounded-xl hidden md:flex items-center justify-center">
          {CAROUSEL.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              loading="lazy"
              decoding="async"
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
              src={src}
            />
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {CAROUSEL.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  active === i ? "bg-white w-6" : "bg-white/50 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col items-start justify-center gap-6 md:gap-8 w-full">
          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-3xl md:text-3xl font-normal text-heading">
              Preencha abaixo. Em até 5 minutos a gente te chama no WhatsApp pra
              montar o seu site
            </h1>
            <p className="text-base md:text-lg text-body max-w-text">
              O que a gente vai fazer na primeira conversa: entender o seu
              negócio, mostrar como um site pode aumentar as suas vendas e te
              passar um orçamento sem enrolação.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-3 w-full md:max-w-form"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 w-full">
              <input aria-label="Qual seu nome?" required placeholder="Qual seu nome?" className="input-field" type="text" name="nome" />
              <input aria-label="WhatsApp com DDD" required placeholder="WhatsApp com DDD" maxLength={15} className="input-field" type="tel" name="telefone" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 w-full">
              <input aria-label="Seu melhor e-mail" required placeholder="Seu melhor e-mail" className="input-field" type="email" name="email" />
              <input aria-label="Nome da empresa" required placeholder="Nome da empresa" className="input-field" type="text" name="empresa" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 w-full">
              <SelectField
                name="faturamento"
                label="Faturamento mensal"
                options={[
                  { value: "ate-30k", label: "Até R$30k" },
                  { value: "30k-50k", label: "R$30K - R$50K" },
                  { value: "50k-100k", label: "R$50K - R$100K" },
                  { value: "100k-300k", label: "R$100K - R$300K" },
                  { value: "300k+", label: "Acima de R$300K" },
                ]}
              />
              <SelectField
                name="tem_site"
                label="Já tem site hoje?"
                options={[
                  { value: "sim-nao-vende", label: "Sim, mas não vende" },
                  { value: "sim-desatualizado", label: "Sim, mas está desatualizado" },
                  { value: "nao", label: "Não tenho site" },
                ]}
              />
            </div>
            <input type="hidden" name="utm_source" />
            <input type="hidden" name="utm_medium" />
            <input type="hidden" name="utm_campaign" />
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar"}
            </button>
            <a
              href="#"
              className="text-xs text-secondary text-center hover:text-primary transition-colors"
            >
              Ao enviar, você concorda com nossos termos de serviço.
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}

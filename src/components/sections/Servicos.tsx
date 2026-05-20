import { Fragment } from "react";
import { SERVICES } from "@/data/content";

const VIDEO_LABELS = [
  "Animação isométrica de um site sendo construído e conectado",
  "Animação isométrica de camadas e análise de dados de um site",
];

export function Servicos() {
  return (
    <section id="servicos" className="section-px py-[54px] md:py-[103px] scroll-mt-25">
      <div className="section-container flex flex-col items-center gap-[40px] md:gap-[55px]">
        <div className="flex w-full flex-col gap-[25px]">
          <h2 className="font-medium text-[28px] leading-1.1 text-primary md:text-[40px] md:max-w-[737px]">
            Do briefing ao site no ar:
            <span className="text-[#aaa]"> presença digital que trabalha por você</span>
          </h2>
          <p className="font-light text-[15px] leading-1.4 text-muted md:text-[20px] md:max-w-[487px]">
            O caminho certo depende do momento do seu negócio. Te ajudamos a
            identificar o que faz sentido agora.
          </p>
        </div>

        <div className="flex w-full flex-col gap-[43px] md:flex-row md:items-stretch md:gap-[40px]">
          {SERVICES.map((s, i) => (
            <Fragment key={s.code}>
              <article className="flex flex-1 flex-col gap-[17px] md:h-[514px] md:justify-between md:gap-0">
                <p className="font-light text-[15px] leading-1.4 text-[#373737]">
                  {s.code}
                </p>
                <div className="flex w-full items-center justify-center overflow-hidden md:py-2">
                  <video
                    src={s.video}
                    aria-label={VIDEO_LABELS[i]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="h-auto w-full max-w-[420px] object-contain mix-blend-screen md:max-w-[400px]"
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <h3 className="font-bold text-[15px] leading-1.1 text-primary">
                    {s.title}
                  </h3>
                  <p className="font-light text-[15px] leading-1.4 text-muted">
                    {s.description}
                  </p>
                </div>
              </article>
              {i < SERVICES.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block w-px self-stretch bg-white/15"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

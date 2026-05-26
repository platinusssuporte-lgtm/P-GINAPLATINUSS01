"use client";

import { useEffect, useState } from "react";

const PHOTOS = [
  "/pages/home/quem_somos/foto_1.webp",
  "/pages/home/quem_somos/foto_2.webp",
];

function Copy({
  paraSize,
}: {
  paraSize: "desktop" | "mobile";
}) {
  const pClass =
    paraSize === "desktop"
      ? "font-normal text-[16px] leading-1.4 text-muted"
      : "font-normal text-[15px] leading-[1.6] text-[#ababab]";
  return (
    <div
      className={
        paraSize === "desktop"
          ? "flex w-full flex-col gap-[30px]"
          : "animate-fade-up flex w-full flex-col gap-[30px]"
      }
      style={paraSize === "mobile" ? { animationDelay: "100ms" } : undefined}
    >
      <h2 className="font-medium leading-1.1 text-white text-[30px]">
        Quem está por trás da <span className="text-white">Platinuss</span>
      </h2>
      <p className={pClass}>
        <span className="text-white">
          Somos um estúdio de webdesign especializado em criar sites que vendem.
        </span>{" "}
        Não fazemos site bonito que não traz resultado. Fazemos presença digital
        pensada estrategicamente pra transformar visitante em cliente e fazer o
        seu negócio crescer.
      </p>
      <p className={pClass}>
        A Platinuss une{" "}
        <span className="text-white">design, tecnologia e estratégia de vendas</span>{" "}
        em cada projeto. Cada site é construído por profissionais de verdade
        designers, desenvolvedores e especialistas em conversão{" "}
        <span className="text-white">
          focados em fazer você aparecer e vender mais.
        </span>
      </p>
    </div>
  );
}

export function QuemSomos() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % PHOTOS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Desktop */}
      <section
        id="quem-somos"
        className="hidden h-[599px] scroll-mt-25 px-[100px] md:flex md:flex-col md:items-center md:justify-center"
      >
        <div className="animate-fade-up relative flex h-full w-full max-w-container items-center gap-[50px] rounded-b-[28px] border border-border bg-surface/90 px-[44px] py-[16px] backdrop-blur-[20px]">
          <div className="relative h-full w-[513px] shrink-0 overflow-hidden rounded-[12px]">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              alt="Equipe Platinuss em conversa estratégica"
              loading="lazy"
              className="absolute left-[43px] top-[48px] h-[443px] w-[229px] rounded-[20px] object-cover"
              src="/pages/home/quem_somos/foto_1.webp"
              style={{ objectPosition: "65% 50%" }}
            />
            <img
              alt="Apresentação da metodologia Platinuss"
              loading="lazy"
              className="absolute left-[238px] top-[86px] h-[444px] w-[230px] rounded-[20px] object-cover -scale-x-100"
              src="/pages/home/quem_somos/foto_2.webp"
            />
            {/* eslint-enable @next/next/no-img-element */}
          </div>
          <div className="flex h-[513px] flex-1 flex-col justify-center">
            <Copy paraSize="desktop" />
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section
        id="quem-somos-mobile"
        className="flex flex-col items-center gap-[38px] scroll-mt-25 border-y border-border bg-surface/90 px-[24px] pt-[25px] pb-[40px] backdrop-blur-[20px] md:hidden"
      >
        <div className="animate-fade-up relative h-[343px] w-[327px] overflow-hidden rounded-[12px]">
          {PHOTOS.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              alt=""
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
              src={src}
            />
          ))}
          <div className="absolute bottom-[14px] left-1/2 flex -translate-x-1/2 gap-[6px]">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Foto ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-[5px] w-[50px] rounded-full border-[0.2px] border-[#6c6c6c] transition-colors ${
                  active === i ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
        <Copy paraSize="mobile" />
      </section>
    </>
  );
}

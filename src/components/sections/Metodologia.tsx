"use client";

import { useState } from "react";
import { METHOD_STEPS } from "@/data/content";

const PANEL_INNER_WIDTH = 989;
const GRADIENT_OVERLAY =
  "linear-gradient(185deg, rgba(5, 5, 5, 0) 6%, rgb(5, 5, 5) 79%)";

export function Metodologia() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="metodologia"
      className="section-px pt-[50px] pb-[20px] md:pt-[115px] md:pb-[40px] scroll-mt-25"
    >
      <div className="section-container flex flex-col items-center gap-[29px] md:gap-[52px]">
        <div className="flex w-full flex-col gap-[25px]">
          <h2 className="font-medium text-[28px] leading-1.1 text-muted md:text-[40px]">
            O método que <span className="text-primary">garante um site</span> que
            realmente <span className="text-primary">vende</span>
          </h2>
          <p className="font-light text-[15px] leading-1.4 text-muted md:text-[20px] md:max-w-[889px]">
            Transparência em cada etapa. Você acompanha a criação do início ao
            fim e sabe exatamente o que está sendo feito.
          </p>
        </div>

        {/* Mobile: static stacked list */}
        <ul className="flex w-full flex-col gap-[7px] md:hidden">
          {METHOD_STEPS.map((step, i) => (
            <li
              key={step.number}
              className="animate-fade-up relative flex w-full flex-col gap-[20px] overflow-hidden rounded-[8px] border border-[#454545]/20 bg-[#0f0f0f] px-[20px] py-[40px]"
              style={{ animationDelay: `${i * 0}ms` }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-[20px] top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-bold leading-1.1 text-[179px] tracking-[-5.97px] bg-clip-text text-transparent bg-gradient-to-b from-[#171717] from-[15%] to-[#0f0f0f] to-[83%]"
              >
                {step.number}
              </span>
              <h3 className="relative font-normal text-[25px] leading-1.1 text-primary tracking-[-1.1px]">
                {step.heading}
              </h3>
              <p className="relative font-light text-[10px] leading-1.4 text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ul>

        {/* Desktop: hover-to-expand horizontal accordion */}
        <div className="hidden w-full md:flex md:gap-[12.7px]">
          {METHOD_STEPS.map((step, i) => {
            const isActive = active === i;
            return (
              <button
                key={step.number}
                type="button"
                aria-expanded={isActive}
                aria-label={`Etapa ${step.number}: ${step.title}`}
                onMouseEnter={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group relative h-[535px] cursor-pointer overflow-hidden rounded-[8px] border border-border bg-surface text-left"
                style={{
                  flex: isActive ? "1 1 0%" : "0 0 120px",
                  minWidth: 0,
                  transition:
                    "flex-grow 600ms ease-out, flex-basis 500ms ease-out, flex-shrink 500ms ease-out",
                }}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-1/2 top-[21%] -translate-x-1/2 -translate-y-1/2 select-none font-bold leading-1.1 text-[179px] tracking-[-5.63px] whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-b from-[#171717] from-[15%] to-[#0f0f0f] to-[83%] transition-opacity duration-300 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {step.number}
                </span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-1/2 top-[79%] origin-center whitespace-nowrap font-normal text-[33.27px] text-primary tracking-[-1.05px] leading-1.1 transition-opacity duration-300 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                  style={{ transform: "translate(-50%, -50%) rotate(-90deg)" }}
                >
                  {step.title}
                </span>
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 left-0 h-full transition-opacity duration-300 ease-out ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ width: PANEL_INNER_WIDTH }}
                >
                  <div className="absolute inset-0 bg-[#0f0f0f]" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    src={step.image}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ backgroundImage: GRADIENT_OVERLAY }}
                  />
                </div>
                <div
                  className={`pointer-events-none absolute top-0 left-0 h-full flex flex-col justify-end gap-[11px] px-[54px] py-[40px] transition-opacity duration-300 ${
                    isActive ? "opacity-100 delay-200" : "opacity-0"
                  }`}
                  style={{ width: PANEL_INNER_WIDTH }}
                >
                  <p className="font-normal text-[31px] leading-1.1 text-primary tracking-[-1.05px] whitespace-nowrap">
                    {step.heading}
                  </p>
                  <p className="font-light text-[16px] leading-1.4 text-muted">
                    {step.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

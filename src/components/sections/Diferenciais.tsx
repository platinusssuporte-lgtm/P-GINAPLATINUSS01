import { DIFFERENTIATORS } from "@/data/content";

// The icon SVGs are 300x150 sprites; the visible glyph is cropped via a
// large negative inset on an inner wrapper (Figma export artifact).
const ICON_CFG = [
  {
    alt: "Ícone de lupa",
    mobile: { width: 39.197, height: 39.197, inset: "-331.52%" },
    desktop: "-331.52%",
  },
  {
    alt: "Ícone de átomo",
    mobile: { width: 57, height: 58, inset: "-219.71% -226.15% -220.36% -223.39%" },
    desktop: "-328.94%",
  },
  {
    alt: "Ícone de capacete",
    mobile: { width: 58, height: 51, inset: "-246.62% -225.62% -255.23% -224.63%" },
    desktop: "-325.64% -333.98% -321.48%",
  },
  {
    alt: "Ícone de gráfico de barras",
    mobile: { width: 53, height: 59, inset: "-218.62% -244.41% -217.42% -233.9%" },
    desktop: "-331.52% -323.18%",
  },
  {
    alt: "Ícone de engrenagem",
    mobile: { width: 56, height: 58, inset: "-222.71% -231.81% -225.67% -227.21%" },
    desktop: "-333.05% -328.77%",
  },
];

export function Diferenciais() {
  return (
    <section id="diferenciais" className="section-px py-[55px] md:py-[100px] scroll-mt-25">
      <div className="section-container">
        <ul className="flex flex-col gap-[75px] md:flex-row md:flex-wrap md:justify-center md:gap-x-[113px] md:gap-y-[80px]">
          {DIFFERENTIATORS.map((d, i) => {
            const cfg = ICON_CFG[i];
            const titleLines = d.title.split("\n");
            return (
              <li
                key={d.title}
                className="animate-fade-up flex flex-col gap-[12px] md:w-[360px] md:gap-[14px]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* mobile icon */}
                <div
                  className="relative shrink-0 md:hidden"
                  style={{ width: cfg.mobile.width, height: cfg.mobile.height }}
                >
                  <div className="absolute" style={{ inset: cfg.mobile.inset }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={cfg.alt}
                      className="block h-full w-full max-w-none"
                      src={d.icon}
                    />
                  </div>
                </div>
                {/* desktop icon */}
                <div className="relative hidden size-[40.573px] shrink-0 md:block mb-4">
                  <div className="absolute" style={{ inset: cfg.desktop }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={cfg.alt}
                      className="block h-full w-full max-w-none"
                      src={d.icon}
                    />
                  </div>
                </div>
                <h3 className="font-regular text-[30px] leading-1.1 text-primary md:text-[40px]">
                  {titleLines.map((line, li) => (
                    <span key={li}>
                      {line}
                      {li < titleLines.length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className="font-normal text-[12px] leading-1.4 text-muted md:text-[16px]">
                  {d.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

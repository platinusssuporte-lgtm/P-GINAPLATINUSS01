import { OBJECTIONS } from "@/data/content";

function Tick({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 size-[14px] bg-background border border-[#807f7f] ${className}`}
    />
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="bg-[rgba(1,255,206,0.1)] border-[0.637px] border-[#01ffce] inline-flex items-center justify-center px-[14px] py-[7.645px] rounded-[3.823px] w-fit">
      <span className="font-semibold text-[9.556px] tracking-[2px] uppercase text-[#01ffce] leading-1.1">
        {label}
      </span>
    </span>
  );
}

export function Objecoes() {
  const [o1, o2, o3] = OBJECTIONS;

  return (
    <section id="objecoes" className="relative section-px scroll-mt-25 pb-12 md:pb-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-20px] left-0 right-0 h-[120px] z-20"
        style={{
          background:
            "linear-gradient(to top, rgba(5, 5, 5, 0) 0%, rgb(5, 5, 5) 60.274%)",
        }}
      />
      <div className="section-container relative">
        {/* Desktop blueprint grid */}
        <div className="hidden md:flex md:flex-col">
          <div className="animate-fade-up relative flex h-[384px] flex-col items-center justify-center gap-[25px] border border-[#454545] px-[80px] pt-[149px] pb-[70px]">
            <Tick className="-top-[7px] -left-[7px]" />
            <Tick className="-top-[7px] -right-[7px]" />
            <p className="font-medium leading-1.1 text-[#b3b3b3] text-center text-[40px] w-[832px]">
              As <span className="text-white">desculpas</span> que fazem empresas
              continuarem perdendo vendas online.
            </p>
            <p className="font-light leading-1.4 text-[#b3b3b3] text-center text-[20px] w-[520px]">
              Não se trata de te convencer. Se trata de mostrar, com clareza,
              quanto você perde sem um site e quanto pode ganhar com um.
            </p>
          </div>

          <div className="relative -mt-px flex h-[312px]">
            <article
              className="animate-fade-up flex flex-1 flex-col items-start gap-[25px] border border-[#454545] px-[80px] py-[35px]"
              style={{ animationDelay: "0ms" }}
            >
              <Chip label={o1.index} />
              <div className="flex flex-col gap-[12px]">
                <h3 className="font-bold text-[20px] leading-1.1 text-white w-[476px]">
                  {o1.quote}
                </h3>
                <p className="font-light text-[18px] leading-1.4 text-[#b3b3b3] w-[476px]">
                  {o1.answer}
                </p>
              </div>
            </article>
            <article
              className="animate-fade-up flex flex-1 flex-col items-start gap-[25px] border border-[#454545] px-[80px] py-[35px] -ml-px"
              style={{ animationDelay: "80ms" }}
            >
              <Chip label={o2.index} />
              <div className="flex flex-col gap-[12px]">
                <h3 className="font-bold text-[20px] leading-1.1 text-white w-[476px]">
                  {o2.quote}
                </h3>
                <p className="font-light text-[18px] leading-1.4 text-[#b3b3b3] w-[476px]">
                  {o2.answer}
                </p>
              </div>
            </article>
            <Tick className="-top-[7px] -left-[7px]" />
            <Tick className="-top-[7px] -right-[7px]" />
            <Tick className="-top-[7px] left-1/2 -translate-x-1/2" />
            <Tick className="-bottom-[7px] -left-[7px]" />
            <Tick className="-bottom-[7px] -right-[7px]" />
            <Tick className="-bottom-[7px] left-1/2 -translate-x-1/2" />
          </div>

          <article
            className="animate-fade-up relative -mt-px flex h-[241px] flex-col items-start gap-[25px] border border-[#454545] px-[80px] py-[35px]"
            style={{ animationDelay: "160ms" }}
          >
            <Tick className="-bottom-[7px] -left-[7px]" />
            <Tick className="-bottom-[7px] -right-[7px]" />
            <Chip label={o3.index} />
            <div className="flex flex-col gap-[12px]">
              <h3 className="font-semibold text-[20px] leading-1.1 text-white">
                {o3.quote}
              </h3>
              <p className="font-light text-[18px] leading-1.4 text-[#b3b3b3] w-[730px] whitespace-pre-wrap">
                {o3.answer}
              </p>
            </div>
          </article>
        </div>

        {/* Mobile stacked */}
        <div className="flex flex-col md:hidden">
          <div className="animate-fade-up flex flex-col items-center gap-[20px] border border-[#454545] px-[24px] py-[40px] text-center">
            <p className="font-medium leading-1.1 text-[#b3b3b3] text-[26px]">
              As <span className="text-white">desculpas</span> que fazem empresas
              continuarem perdendo vendas online.
            </p>
            <p className="font-light leading-1.4 text-[#b3b3b3] text-[15px]">
              Não se trata de te convencer. Se trata de mostrar, com clareza,
              quanto você perde sem um site e quanto pode ganhar com um.
            </p>
          </div>
          {OBJECTIONS.map((o, i) => (
            <article
              key={o.index}
              className="animate-fade-up flex flex-col items-start gap-[18px] border border-[#454545] -mt-px px-[24px] py-[30px]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Chip label={o.index} />
              <div className="flex flex-col gap-[10px]">
                <h3 className="font-bold text-[18px] leading-1.1 text-white">
                  {o.quote}
                </h3>
                <p className="font-light text-[15px] leading-1.4 text-[#b3b3b3]">
                  {o.answer}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const TEXTURE_VERDE = "/pages/home/textures/testura_verde.webp";
const TEXTURE_WHITE_BLUR = "/pages/home/textures/testura_white_blur.webp";

const tex = (url: string) => ({
  backgroundImage: `url("${url}")`,
  backgroundSize: "500px",
  backgroundRepeat: "repeat" as const,
});

function CtaWave({ waveClass }: { waveClass: string }) {
  return (
    <div className={`cta-rings ${waveClass} absolute w-full h-full pointer-events-none`}>
      <div className="cta-ring1 absolute w-full h-full" style={tex(TEXTURE_VERDE)} />
      <div className="cta-ring2 absolute w-full h-full" style={tex(TEXTURE_VERDE)} />
      <div className="cta-ring3 absolute w-full h-full" style={tex(TEXTURE_WHITE_BLUR)} />
    </div>
  );
}

function Tick({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 size-[14px] bg-background border border-[#807f7f] ${className}`}
    />
  );
}

export function CtaFinal() {
  return (
    <section id="cta-final" className="relative section-px py-[40px] md:py-[100px]">
      <div className="section-container">
        <div className="animate-fade-up relative w-full h-fit py-12 md:h-[360px] border border-[#454545]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={tex(TEXTURE_VERDE)} />
            <CtaWave waveClass="cta-wave1" />
            <CtaWave waveClass="cta-wave2" />
            <CtaWave waveClass="cta-wave3" />
          </div>
          <Tick className="-top-[7px] -left-[7px]" />
          <Tick className="-top-[7px] -right-[7px]" />
          <Tick className="-bottom-[7px] -left-[7px]" />
          <Tick className="-bottom-[7px] -right-[7px]" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-10 gap-6 md:gap-8">
            <h2 className="font-medium text-[20px] md:text-[40px] leading-1.1 text-primary text-center max-w-[820px]">
              Enquanto você pensa, seu concorrente vende.
              <br className="hidden md:block" /> Bora colocar o seu site no ar{" "}
              <br className="md:hidden" />
              agora.
            </h2>
            <a
              href="#form"
              className="btn-pulse bg-accent text-base md:text-lg font-medium text-black px-6 py-3 md:px-5 md:py-2.5 rounded-md w-fit cursor-pointer hover:bg-accent-hover"
            >
              Falar com a Platinuss
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

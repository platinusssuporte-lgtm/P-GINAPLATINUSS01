const TEXTURE_VERDE = "/pages/home/textures/testura_verde.webp";
const TEXTURE_WHITE = "/pages/home/textures/testura_white.webp";
const TEXTURE_WHITE_BLUR = "/pages/home/textures/testura_white_blur.webp";

const tex = (url: string) => ({
  backgroundImage: `url("${url}")`,
  backgroundSize: "500px",
  backgroundRepeat: "repeat" as const,
});

function RingWave({ waveClass }: { waveClass: string }) {
  return (
    <div className={`rings-wrapper ${waveClass} absolute w-full h-full`}>
      <div className="ring1 absolute w-full h-full" style={tex(TEXTURE_WHITE)} />
      <div className="ring2 absolute w-full h-full" style={tex(TEXTURE_VERDE)} />
      <div className="ring3 absolute w-full h-full" style={tex(TEXTURE_VERDE)} />
      <div className="ring4 absolute w-full h-full" style={tex(TEXTURE_WHITE_BLUR)} />
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="md:min-h-screen min-h-screen-almost flex items-center justify-center relative overflow-hidden border-b border-accent section-px"
    >
      <div className="absolute inset-0 opacity-5" style={tex(TEXTURE_VERDE)} />
      <RingWave waveClass="wave1" />
      <RingWave waveClass="wave2" />
      <RingWave waveClass="wave3" />

      {/* eslint-disable @next/next/no-img-element */}
      <img
        alt=""
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        src="/pages/home/glow/1.svg"
        style={{ filter: "blur(10px)" }}
      />
      <img
        alt=""
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        src="/pages/home/glow/2.svg"
        style={{ filter: "blur(20px)" }}
      />
      <img
        alt=""
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        src="/pages/home/glow/3.svg"
      />
      {/* eslint-enable @next/next/no-img-element */}

      <div className="section-container flex flex-col md:items-center md:justify-center gap-3 z-10">
        <h1 className="slide-in-blur slide-in-blur-1 text-3xl md:text-6xl font-regular text-heading md:text-center tracking-tight">
          Sem site, sua empresa perde cliente <br className="hidden md:block" />
          todo dia pra quem tem um.
        </h1>
        <h2 className="slide-in-blur slide-in-blur-2 text-base md:text-lg text-body md:text-center leading-1.4">
          Enquanto você depende só do Instagram, seu concorrente fecha vendas no
          Google, no WhatsApp e no automático. <br className="hidden md:block" />A
          Platinuss cria o site profissional que trabalha por você 24 horas por
          dia.
        </h2>
        <a
          href="#form"
          className="slide-in-blur slide-in-blur-2 btn-pulse bg-accent text-base md:text-lg font-medium text-black px-4 py-2 mt-3 rounded-md w-fit cursor-pointer"
        >
          Quero meu site agora
        </a>
      </div>
    </section>
  );
}

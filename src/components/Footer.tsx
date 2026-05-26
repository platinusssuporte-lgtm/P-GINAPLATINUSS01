export function Footer() {
  return (
    <footer
      id="footer"
      className="relative flex flex-col items-center justify-end overflow-hidden min-h-75 md:min-h-125 pb-6 px-5 md:px-25 scroll-mt-25"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 top-0 flex items-start justify-center w-full"
      >
        <span
          className="font-sans font-medium leading-none tracking-tight text-transparent px-1.5"
          style={{
            fontSize: "clamp(80px, 30vw, 440px)",
            WebkitTextStroke: "1px rgba(185, 185, 185, 0.18)",
          }}
        >
          platinuss
        </span>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgb(5, 5, 5) 10.83%, rgba(5, 5, 5, 0.9) 20.43%, rgba(5, 5, 5, 0) 103.23%)",
        }}
      />
      <div className="relative flex flex-col md:flex-row h-auto md:h-[42px] w-full container-max items-center justify-between gap-6 md:gap-0 px-2.5">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-11 text-sm md:text-base leading-1.4 text-center md:text-left">
          <p className="text-dim">Copyright © 2025 Platinuss Design Todos os direitos reservados</p>
          <a href="#" className="text-muted hover:text-white transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

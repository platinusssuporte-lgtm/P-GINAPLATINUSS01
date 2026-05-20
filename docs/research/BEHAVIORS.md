# Algarys — Behavior Bible

## Global
- **Reveal animations**: elements carry `animate-fade-up` (and `fade-from-left/right`, `scale-in`, `bar-grow`, `grow-x`) directly in markup with inline `style="animation-delay: Nms"`. Keyframes defined in CSS; `both` fill + easing `cubic-bezier(.22,1,.36,1)`, default `--motion-duration`. They effectively play once on mount with staggered delays. Replicate by keeping the classes + delays (no IntersectionObserver strictly needed, but a reveal-on-scroll hook is a nice-to-have).
- **Smooth scroll**: none detected (no Lenis). Native scroll + anchor `scroll-mt-25` offset for fixed nav.
- **Nav**: `fixed top-0 h-nav(90px) w-full z-50 border-b border-white/10 backdrop-blur(35px)`, bg transparent. No measurable scroll-state change (stays translucent blurred). Mobile: hamburger toggles a menu overlay.

## Per-section
- **Hero (`home`)**: static. 3 stacked `glow/*.svg` absolutely positioned at bottom (`absolute bottom-0 left-0 w-full pointer-events-none`) as layered green glow. Headline fade-in. CTA "Agendar análise gratuita" (mint pill button).
- **logos**: infinite **marquee**, keyframe `logos-marquee` (translateX 0 → -50%), track duplicated ×2 for seamless loop. ~30+ client logos (mixed svg/webp). Likely `animation: logos-marquee linear infinite` slow.
- **form**: standard controlled form. Fields: nome(text), telefone(tel), email(email), empresa(text), cargo(text), tamanho(select), faturamento(select), ia_implementada(select), gargalo(textarea) + hidden UTM. Submit "Enviar" → posts/redirects to WhatsApp. Side image `imagem_form.webp`. Clone: wire local state, submit opens WhatsApp link (no real backend).
- **prova-social**: static stat row, 5 items (+50 Empresas transformadas / 52 Projetos / 10% mais conversão / +600h economizadas / 100 funcionários realocados). May use `bar-grow`/count animation; keep static or simple fade.
- **servicos**: 2 cards (ALG 0.1 "Desenvolvimento Personalizado de IA", ALG 0.2 "Diagnóstico IA - 30 dias"). Each has an **autoplay loop muted playsinline 500×500 video** (`Timelineredred.mp4`, `Timelinered.mp4`).
- **metodologia**:
  - **Desktop INTERACTION MODEL: click-driven horizontal accordion.** 4 `<button>` panels side-by-side. Active panel `aria-expanded="true"` grows via `flex: 1 1 0%` + `transition: flex-grow 600ms ease-out, flex-basis 500ms, flex-shrink 500ms`; shows full-bleed image (`metodologia/<step>.webp`) with `linear-gradient(185deg, rgba(5,5,5,0) 6%, #050505 79%)` overlay + title + description at bottom. Collapsed panels show big gradient number (`text-[179px]`, gradient `#171717→#0f0f0f`) + vertical rotated label (`rotate(-90deg)`). Default active = panel 1 (Diagnóstico).
  - **Mobile: static accordion list** (`ul md:hidden`) — all 4 cards stacked open, each `bg-[#0f0f0f] border-[#454545]/20 rounded-[8px]` with big faded number behind.
  - Steps: 1 Diagnóstico, 2 Priorização, 3 Construção, 4 Medição.
- **objecoes**: **static** bordered-card grid (no JS, no buttons). Header card (h-384, border `#454545`, corner square ticks `size-14 bg-background border-#807f7f` at top corners) + row of objection `<article>` cards (border `#454545`, mint `OBJEÇÃO N` chip `bg-[rgba(1,255,206,0.1)]`). 4 objections, each title quote + answer paragraph.
- **quem-somos**: 2 DOM variants. Desktop `hidden md:flex h-[599px] px-[100px]`: copy + 2 photos (`foto_1`, `foto_2`). Mobile `md:hidden`: stacked. Founded by Pedro & (names).
- **diferenciais**: static feature grid, 5 cards with SVG icons (search, atom, hard-hat, chart-bars, settings). Titles: Método próprio de diagnóstico / Foco exclusivo em IA / Engenheiros especializados / Resultado calculado antes de começar / Acompanhamento pós-entrega. `animate-fade-up` staggered.
- **cta-final**: heading + "Falar com a Algarys" mint button → WhatsApp.
- **footer**: logo wordmark, copyright © 2025, Terms of Service, 4 social icons (IG/LinkedIn/YouTube/WhatsApp).

## Hover states (sampled)
- Buttons: `active:scale-95`/`.98` press; mint pill buttons brighten. `transition` ~200-300ms.
- Logos: greyscale/opacity in marquee (verify).
- Nav links: color shift to white/accent.

## Responsive
- Breakpoint `md` = 768px. Below: single column, hamburger nav, metodologia becomes stacked list, quem-somos switches DOM variant, `.section-px` 100px→24px, font sizes drop (e.g. h2 40px→28px, hero 60px→ smaller).

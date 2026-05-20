# Algarys — Page Topology

Single-page dark landing site (pt-BR). Vite SPA, Tailwind v3, font "Inter Display" (self-hosted). Body bg `#050505`, content surfaces `#0a0a0a`, borders `#1a1a1a`, accent mint `#70ffe3` / bright `#01ffce`.

Fixed `<nav>` (h 90px, `backdrop-blur(35px)`, border-b white/10, z-50) overlays everything.

| # | id | Name | Height(desktop) | Interaction |
|---|----|------|------|-------------|
| — | nav | Navbar | 90px fixed | Anchor links, mobile hamburger menu, "Entre em contato" CTA |
| 0 | `home` | Hero | ~min-h-screen | Static + glow SVG layers at bottom; fade-in reveal |
| 1 | `logos` | Client logo marquee | 128px | **Infinite marquee** (`logos-marquee` keyframe, translateX 0→-50%) |
| 2 | `form` | Lead form + image | 925px | Form (nome, telefone, email, empresa, cargo, 3 selects, textarea, hidden UTMs) → submit "Enviar"; side image `imagem_form.webp` |
| 3 | `prova-social` | Stats row | 236px | Static: +50 / 52 / 10% / +600h / 100 with labels |
| 4 | `servicos` | Services (ALG 0.1 / 0.2) | 944px | 2 cards each w/ autoplay+loop+muted 500×500 video (Timelineredred.mp4, Timelinered.mp4) |
| 5 | `metodologia` | Method 4 steps | 839px | **Desktop: click tabs** (Diagnóstico/Priorização/Construção/Medição) swap big image; **Mobile: accordion list** |
| 6 | `objecoes` | Objections | 935px | OBJEÇÃO 1–4 cards (title quote + answer); has a video/visual aside |
| 7 | `quem-somos` (desktop) | About | 599px | `hidden md:flex` — 2 photos (foto_1, foto_2) + copy |
| 8 | `quem-somos` (mobile) | About | — | `md:hidden` stacked variant |
| 9 | `diferenciais` | Differentiators grid | 1012px | 5 feature cards w/ SVG icons (search, atom, hard-hat, chart-bars, settings) |
| 10 | `cta-final` | Final CTA | 560px | Heading + "Falar com a Algarys" button (WhatsApp link) |
| — | `footer` | Footer | — | Logo, copyright, Terms, social icons (IG/LinkedIn/YouTube/WhatsApp) |

## Layout
- Horizontal padding via `.section-px`: 24px mobile, 100px (`6.25rem`) desktop.
- `md` breakpoint = 768px (Tailwind default). Many sections have distinct desktop/mobile DOM.
- Section vertical rhythm: `py-12 md:py-16` or explicit `py-[100px]`.
- `scroll-mt-25` (6.25rem) on anchor targets to offset fixed nav.

## Nav anchors
Home→#home, Parceiros→#logos, Formulário→#form, Contato→#footer.

## Key external links
- WhatsApp CTA: `https://wa.me/5561986666370?text=...`
- IG: instagram.com/algarystech · LinkedIn: company/algarys · YouTube: channel UCGBYEuu0v3Nm_MAy0SLGk-g

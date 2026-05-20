// Downloads all algarys.com.br assets into public/, preserving path structure.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = "https://algarys.com.br";
const PUBLIC = new URL("../public/", import.meta.url).pathname;

const paths = [
  "/shared/brand/algarys.svg",
  "/shared/brand/logo-algarys/black-logo.webp",
  "/shared/brand/logo-algarys/white-logo.webp",
  "/shared/fonts/InterDisplay-Light.woff2",
  "/shared/fonts/InterDisplay-Regular.woff2",
  "/shared/fonts/InterDisplay-Medium.woff2",
  "/shared/fonts/InterDisplay-SemiBold.woff2",
  "/shared/fonts/InterDisplay-Bold.woff2",
  "/pages/home/glow/1.svg",
  "/pages/home/glow/2.svg",
  "/pages/home/glow/3.svg",
  "/pages/home/logos/vida.svg",
  "/pages/home/logos/ilza.svg",
  "/pages/home/logos/san.svg",
  "/pages/home/logos/clinica.svg",
  "/pages/home/logos/3 [Vectorized].svg",
  "/pages/home/logos/3.svg",
  "/pages/home/logos/Group 1000001113.svg",
  "/pages/home/logos/Logotipo_da_JBS_(2023) 1 [Vectorized].svg",
  "/pages/home/logos/Group 1000001128.webp",
  "/pages/home/logos/Mask group.webp",
  "/pages/home/logos/Group 1000001129.webp",
  "/pages/home/logos/Group 1000001130.webp",
  "/pages/home/logos/ALC.svg",
  "/pages/home/logos/beegames.svg",
  "/pages/home/logos/bew.svg",
  "/pages/home/logos/blox.svg",
  "/pages/home/logos/bonapp.svg",
  "/pages/home/logos/brasil.svg",
  "/pages/home/logos/clip.svg",
  "/pages/home/logos/dou.svg",
  "/pages/home/logos/focus.svg",
  "/pages/home/logos/GOMD.svg",
  "/pages/home/logos/grow.svg",
  "/pages/home/logos/influ.svg",
  "/pages/home/logos/jexs.svg",
  "/pages/home/logos/maximeta.svg",
  "/pages/home/logos/milano.svg",
  "/pages/home/logos/oq.svg",
  "/pages/home/logos/resaltar.svg",
  "/pages/home/logos/seilf.svg",
  "/pages/home/logos/slove.svg",
  "/pages/home/logos/thar.svg",
  "/pages/home/logos/veex.svg",
  "/pages/home/logos/zou.svg",
  "/pages/home/carrosel_fotos/felipe.webp",
  "/pages/home/carrosel_fotos/pedro.webp",
  "/pages/home/carrosel_fotos/imagem_form.webp",
  "/pages/home/metodologia/diagnostico.webp",
  "/pages/home/metodologia/priorizacao.webp",
  "/pages/home/metodologia/construcao.webp",
  "/pages/home/metodologia/medicao.webp",
  "/pages/home/quem_somos/foto_1.webp",
  "/pages/home/quem_somos/foto_2.webp",
  "/pages/home/diferenciais/search.svg",
  "/pages/home/diferenciais/atom.svg",
  "/pages/home/diferenciais/hard-hat.svg",
  "/pages/home/diferenciais/chart-bars.svg",
  "/pages/home/diferenciais/settings.svg",
  "/pages/home/video/Timelinered.mp4",
  "/pages/home/video/Timelineredred.mp4",
  "/pages/home/textures/testura_verde.webp",
  "/pages/home/textures/testura_white.webp",
  "/pages/home/textures/testura_white_blur.webp",
];

async function fetchOne(p) {
  const url = ORIGIN + encodeURI(p);
  const dest = join(PUBLIC, p);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, buf);
    return `ok   ${p} (${buf.length}b)`;
  } catch (e) {
    return `FAIL ${p} — ${e.message}`;
  }
}

async function run() {
  const batchSize = 5;
  const results = [];
  for (let i = 0; i < paths.length; i += batchSize) {
    const batch = paths.slice(i, i + batchSize);
    results.push(...(await Promise.all(batch.map(fetchOne))));
  }
  console.log(results.join("\n"));
  const fails = results.filter((r) => r.startsWith("FAIL"));
  console.log(`\n${results.length - fails.length}/${results.length} downloaded, ${fails.length} failed`);
}
run();

import { FloatingOrb } from "@/components/FloatingOrb";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { Hero } from "@/components/sections/Hero";
import { LeadForm } from "@/components/sections/LeadForm";
import { LogosMarquee } from "@/components/sections/LogosMarquee";
import { Metodologia } from "@/components/sections/Metodologia";
import { Objecoes } from "@/components/sections/Objecoes";
import { QuemSomos } from "@/components/sections/QuemSomos";
import { Servicos } from "@/components/sections/Servicos";
import { Stats } from "@/components/sections/Stats";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <LogosMarquee />
      <LeadForm />
      <Stats />
      <Servicos />
      <Metodologia />
      <Objecoes />
      <QuemSomos />
      <Diferenciais />
      <CtaFinal />
      <Footer />
      <FloatingOrb />
    </div>
  );
}

import { Hero } from "@/components/sections/Hero";
import { Spine } from "@/components/sections/spine/Spine";
import { CapabilityMatrix } from "@/components/sections/CapabilityMatrix";
import { DossierList } from "@/components/sections/dossiers/DossierList";
import { IntegrationArgument } from "@/components/sections/IntegrationArgument";
import { ProofWall } from "@/components/sections/ProofWall";
import { MaterialsDivision } from "@/components/sections/MaterialsDivision";
import { Contact } from "@/components/sections/contact/Contact";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Spine />
        <CapabilityMatrix />
        <DossierList />
        <IntegrationArgument />
        <ProofWall />
        <MaterialsDivision />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

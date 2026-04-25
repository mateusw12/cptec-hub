import { Header } from "@/components/layout";
import { CapitalsGrid } from "@/components/weather";
import {
  PageMain,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
} from "@/components/layout/PageShell";

export default function HomePage() {
  return (
    <>
      <Header />
      <PageMain>
        <section>
          <SectionHeader>
            <SectionTitle>Condições nas Capitais</SectionTitle>
            <SectionSubtitle>atualizado em tempo real</SectionSubtitle>
          </SectionHeader>
          <CapitalsGrid />
        </section>
      </PageMain>
    </>
  );
}

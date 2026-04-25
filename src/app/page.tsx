import { Header } from "@/components/layout";
import { EstadosGrid } from "@/components/ibge";
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
            <SectionTitle>Estados do Brasil</SectionTitle>
            <SectionSubtitle>dados populacionais IBGE 2024</SectionSubtitle>
          </SectionHeader>
          <EstadosGrid />
        </section>
      </PageMain>
    </>
  );
}

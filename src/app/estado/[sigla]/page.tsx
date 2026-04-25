import { Header } from "@/components/layout";
import { EstadoDetail } from "./EstadoDetail";

interface EstadoPageProps {
  params: Promise<{ sigla: string }>;
}

export default async function EstadoPage({ params }: EstadoPageProps) {
  const { sigla } = await params;

  return (
    <>
      <Header />
      <EstadoDetail sigla={sigla.toUpperCase()} />
    </>
  );
}

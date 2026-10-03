import type { Metadata } from "next";
import AccountGallery from "@/components/account-gallery";
import { demoFamilies } from "@/data/demo-families";

export const metadata: Metadata = {
  title: "Vitrine de contas",
  description: "Exemplos fictícios de contas essenciais para demonstrar a Vitrine de Contas.",
};

export default function VitrinePage() {
  return (
    <>
      <section className="page-intro">
        <span className="eyebrow">Histórias demonstrativas</span>
        <h1>Conheça as famílias por trás de cada necessidade.</h1>
        <p>
          Explore três histórias criadas para apresentar a experiência da Vitrine. Nomes, relatos, contas e valores são fictícios; nenhuma contribuição é processada.
        </p>
      </section>
      <section className="gallery-section" aria-label="Contas demonstrativas">
        <AccountGallery families={demoFamilies} />
      </section>
    </>
  );
}
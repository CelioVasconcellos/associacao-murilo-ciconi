import type { Metadata } from "next";
import OneTimeDonationForm from "@/components/one-time-donation-form";

export const metadata: Metadata = {
  title: "Doação pontual",
  description: "Prévia demonstrativa para uma contribuição única, sem recorrência e sem conta específica.",
};

export default function OneTimeDonationPage() {
  return (
    <>
      <section className="page-intro one-time-intro">
        <span className="eyebrow">Apoio sem recorrência</span>
        <h1>Uma doação pontual, no valor que fizer sentido.</h1>
        <p>Contribua uma única vez com a rede geral, sem direcionar o valor a uma conta específica e sem iniciar uma mensalidade. Esta página é apenas demonstrativa.</p>
      </section>
      <section className="one-time-section">
        <div className="one-time-context">
          <span className="eyebrow">Contribuição geral</span>
          <h2>Um gesto único também fortalece a rede.</h2>
          <p>Na versão real, o pagamento será processado por um provedor escolhido pela Associação. Pix ou cartão não serão cobrados por este protótipo.</p>
        </div>
        <OneTimeDonationForm />
      </section>
    </>
  );
}
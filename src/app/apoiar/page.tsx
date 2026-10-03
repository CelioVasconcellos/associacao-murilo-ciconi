import type { Metadata } from "next";
import SupporterRegistrationForm from "@/components/supporter-registration-form";

export const metadata: Metadata = {
  title: "Quero fazer parte da rede",
  description: "Conheça a inscrição demonstrativa para apoiar mensalmente a rede.",
};

export default function SupporterPage() {
  return (
    <>
      <section className="page-intro supporter-intro">
        <span className="eyebrow">Rede de apoio · inscrição demonstrativa</span>
        <h1>Quero fazer parte da rede.</h1>
        <p>
          A meta inicial é reunir 1.000 apoiadores, sem limitar o tamanho da rede. Escolha uma contribuição mensal a partir de R$ 10; você pode apoiar com R$ 10, R$ 25, R$ 50 ou outro valor maior. Nesta prévia, o formulário não envia nem armazena dados e nenhum pagamento é realizado.
        </p>
      </section>
      <section className="supporter-section">
        <div className="supporter-context">
          <span className="eyebrow">Como funciona</span>
          <h2>Um apoio recorrente, com informação clara.</h2>
          <ol className="supporter-steps">
            <li>Informe seus dados de contato e escolha um valor mensal.</li>
            <li>Selecione cartão de crédito ou Pix Automático.</li>
            <li>Na inscrição real, confirme a cobrança e a recorrência em um ambiente seguro.</li>
          </ol>
          <p className="supporter-payment-note">
            Os dados do cartão não devem ser digitados neste formulário. No Pix Automático, a autorização da recorrência acontece junto à instituição financeira do apoiador.
          </p>
          <p className="supporter-payment-note">
            Antes de abrir inscrições reais, a Associação ainda precisará definir regras de cancelamento, política de privacidade e o canal de atendimento ao apoiador.
          </p>
        </div>
        <SupporterRegistrationForm />
      </section>
    </>
  );
}
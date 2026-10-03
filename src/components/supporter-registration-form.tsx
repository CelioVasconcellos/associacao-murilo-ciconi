"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type PaymentMethod = "credit-card" | "pix-automatic";
type AmountChoice = "10" | "25" | "50" | "other";

export default function SupporterRegistrationForm() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card");
  const [amountChoice, setAmountChoice] = useState<AmountChoice>("10");
  const [otherAmount, setOtherAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="supporter-form" onSubmit={handleSubmit}>
      <div className="supporter-form-heading">
        <h2>Seus dados</h2>
        <p>Preencha apenas para visualizar a etapa de inscrição.</p>
      </div>

      <div className="supporter-fields">
        <label className="supporter-field" htmlFor="supporter-name">
          Nome completo
          <input id="supporter-name" name="name" type="text" autoComplete="name" required />
        </label>
        <label className="supporter-field" htmlFor="supporter-email">
          E-mail
          <input id="supporter-email" name="email" type="email" autoComplete="email" required />
        </label>
        <label className="supporter-field supporter-field-full" htmlFor="supporter-phone">
          Telefone para contato <span>(opcional)</span>
          <input id="supporter-phone" name="phone" type="tel" autoComplete="tel" />
        </label>
        <fieldset className="supporter-amount-field supporter-field-full">
          <legend>Valor mensal · mínimo de R$ 10</legend>
          <div className="supporter-amount-choices">
            {(["10", "25", "50"] as const).map((amount) => (
              <label className="supporter-amount-choice" key={amount}>
                <input
                  type="radio"
                  name="amountChoice"
                  value={amount}
                  checked={amountChoice === amount}
                  onChange={() => setAmountChoice(amount)}
                />
                <span>R$ {amount}</span>
              </label>
            ))}
            <label className="supporter-amount-choice">
              <input
                type="radio"
                name="amountChoice"
                value="other"
                checked={amountChoice === "other"}
                onChange={() => setAmountChoice("other")}
              />
              <span>Outro valor</span>
            </label>
          </div>
          {amountChoice === "other" ? (
            <label className="supporter-field supporter-other-amount" htmlFor="supporter-other-amount">
              Informe um valor a partir de R$ 10
              <span className="supporter-amount-input">
                <span aria-hidden="true">R$</span>
                <input
                  id="supporter-other-amount"
                  name="amount"
                  type="number"
                  min="10"
                  step="0.01"
                  value={otherAmount}
                  onChange={(event) => setOtherAmount(event.target.value)}
                  required
                />
              </span>
            </label>
          ) : (
            <input type="hidden" name="amount" value={amountChoice} />
          )}
        </fieldset>
      </div>

      <fieldset className="supporter-methods">
        <legend>Forma de contribuição recorrente</legend>
        <label className="supporter-method">
          <input
            type="radio"
            name="paymentMethod"
            value="credit-card"
            checked={paymentMethod === "credit-card"}
            onChange={() => setPaymentMethod("credit-card")}
          />
          <span>
            <strong>Cartão de crédito</strong>
            <span>Cobrança mensal após confirmação em checkout seguro.</span>
          </span>
        </label>
        <label className="supporter-method">
          <input
            type="radio"
            name="paymentMethod"
            value="pix-automatic"
            checked={paymentMethod === "pix-automatic"}
            onChange={() => setPaymentMethod("pix-automatic")}
          />
          <span>
            <strong>Pix Automático</strong>
            <span>Você autoriza a recorrência pelo aplicativo do seu banco.</span>
          </span>
        </label>
      </fieldset>

      <p className="supporter-demo-notice">
        Demonstração: não informe dados reais. As informações preenchidas não são enviadas nem salvas.
      </p>
      <button className="button supporter-submit" type="submit">Simular inscrição</button>
      {submitted && (
        <p className="supporter-confirmation" role="status">
          Simulação concluída. Nenhum dado foi enviado ou armazenado e nenhum pagamento foi iniciado.
        </p>
      )}
    </form>
  );
}
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import DemoPixCopyButton from "@/components/demo-pix-copy-button";
import DemoQrCode from "@/components/demo-qr-code";
import { formatCurrency } from "@/data/demo-families";

type AmountChoice = "10" | "25" | "50" | "other";
type OneTimeMethod = "pix" | "credit-card";

type PendingDonation = {
  amountCents: number;
  method: OneTimeMethod;
  reference: string;
};

export default function OneTimeDonationForm() {
  const [amountChoice, setAmountChoice] = useState<AmountChoice>("10");
  const [otherAmount, setOtherAmount] = useState("");
  const [method, setMethod] = useState<OneTimeMethod>("pix");
  const [pendingDonation, setPendingDonation] = useState<PendingDonation | null>(null);
  const [confirmedAmount, setConfirmedAmount] = useState<number | null>(null);

  const amount = amountChoice === "other" ? Number(otherAmount) : Number(amountChoice);
  const amountCents = Math.round(amount * 100);

  function prepareDonation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!Number.isFinite(amountCents) || amountCents < 100) return;

    setPendingDonation({
      amountCents,
      method,
      reference: `DEMO-GERAL-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    });
  }

  function confirmDemoPayment() {
    if (!pendingDonation) return;
    setConfirmedAmount(pendingDonation.amountCents);
    setPendingDonation(null);
    setOtherAmount("");
    setAmountChoice("10");
  }

  return (
    <form className="one-time-form" onSubmit={prepareDonation}>
      <fieldset className="one-time-fieldset">
        <legend>Valor da doação pontual</legend>
        <div className="one-time-amounts">
          {(["10", "25", "50"] as const).map((value) => (
            <label className="one-time-choice" key={value}>
              <input
                type="radio"
                name="oneTimeAmountChoice"
                value={value}
                checked={amountChoice === value}
                disabled={pendingDonation !== null}
                onChange={() => setAmountChoice(value)}
              />
              <span>R$ {value}</span>
            </label>
          ))}
          <label className="one-time-choice">
            <input
              type="radio"
              name="oneTimeAmountChoice"
              value="other"
              checked={amountChoice === "other"}
              disabled={pendingDonation !== null}
              onChange={() => setAmountChoice("other")}
            />
            <span>Outro valor</span>
          </label>
        </div>
        {amountChoice === "other" && (
          <label className="supporter-field" htmlFor="one-time-other-amount">
            Informe o valor
            <span className="supporter-amount-input">
              <span aria-hidden="true">R$</span>
              <input
                id="one-time-other-amount"
                name="amount"
                type="number"
                min="1"
                step="0.01"
                value={otherAmount}
                onChange={(event) => setOtherAmount(event.target.value)}
                disabled={pendingDonation !== null}
                required
              />
            </span>
          </label>
        )}
      </fieldset>

      <fieldset className="one-time-fieldset">
        <legend>Forma de pagamento · uma única vez</legend>
        <label className="one-time-method">
          <input
            type="radio"
            name="oneTimeMethod"
            value="pix"
            checked={method === "pix"}
            disabled={pendingDonation !== null}
            onChange={() => setMethod("pix")}
          />
          <span><strong>Pix</strong><span>Pagamento único, sem vínculo com uma conta específica.</span></span>
        </label>
        <label className="one-time-method">
          <input
            type="radio"
            name="oneTimeMethod"
            value="credit-card"
            checked={method === "credit-card"}
            disabled={pendingDonation !== null}
            onChange={() => setMethod("credit-card")}
          />
          <span><strong>Cartão</strong><span>Doação única; não é uma assinatura mensal.</span></span>
        </label>
      </fieldset>

      <p className="one-time-notice">
        Prévia demonstrativa: não informe dados reais. Nenhum valor é cobrado ou armazenado.
      </p>
      {!pendingDonation && (
        <button className="button" type="submit">Continuar com doação pontual</button>
      )}

      {pendingDonation?.method === "pix" && (
        <div className="one-time-pending">
          <DemoQrCode label={`QR Pix fictício de ${formatCurrency(pendingDonation.amountCents / 100, 2)} para doação geral; não pagável`} />
          <div className="one-time-pending-details">
            <strong>Pix demonstrativo · não pagável</strong>
            <span>Doação única: {formatCurrency(pendingDonation.amountCents / 100, 2)}</span>
            <code>Referência: {pendingDonation.reference}</code>
            <DemoPixCopyButton reference={pendingDonation.reference} amountCents={pendingDonation.amountCents} />
            <button className="button" type="button" onClick={confirmDemoPayment}>Simular confirmação</button>
          </div>
        </div>
      )}

      {pendingDonation?.method === "credit-card" && (
        <div className="one-time-card-pending">
          <strong>Checkout de cartão não conectado</strong>
          <p>Na operação real, o pagamento único será concluído no checkout seguro do provedor. Não digite dados de cartão nesta prévia.</p>
          <code>Referência demonstrativa: {pendingDonation.reference}</code>
          <button className="button" type="button" onClick={confirmDemoPayment}>Simular confirmação</button>
        </div>
      )}

      {confirmedAmount !== null && (
        <p className="one-time-confirmation" role="status">
          Simulação concluída para {formatCurrency(confirmedAmount / 100, 2)}. Nenhum pagamento foi iniciado ou salvo.
        </p>
      )}
    </form>
  );
}
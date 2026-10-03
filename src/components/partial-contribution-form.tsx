"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import DemoQrCode from "@/components/demo-qr-code";
import DemoPixCopyButton from "@/components/demo-pix-copy-button";
import { formatCurrency } from "@/data/demo-families";

type PartialContributionFormProps = {
  accountAmount: number;
  initialCovered: number;
  accountSlug: string;
};

type PendingContribution = {
  amountCents: number;
  reference: string;
};

export default function PartialContributionForm({ accountAmount, initialCovered, accountSlug }: PartialContributionFormProps) {
  const accountCents = Math.round(accountAmount * 100);
  const [coveredCents, setCoveredCents] = useState(Math.min(accountCents, Math.round(initialCovered * 100)));
  const [contributionAmount, setContributionAmount] = useState("");
  const [lastContribution, setLastContribution] = useState<number | null>(null);
  const [pendingContribution, setPendingContribution] = useState<PendingContribution | null>(null);

  const remainingCents = Math.max(0, accountCents - coveredCents);
  const proposedCents = Math.round(Number(contributionAmount) * 100);
  const validProposal = proposedCents > 0 && proposedCents <= remainingCents;
  const remainingAfterProposal = Math.max(0, remainingCents - proposedCents);
  const progress = accountCents > 0 ? Math.round((coveredCents / accountCents) * 100) : 0;

  function handleCreatePayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validProposal) return;

    setPendingContribution({
      amountCents: proposedCents,
      reference: `DEMO-${accountSlug.toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    });
  }

  function simulatePaymentConfirmation() {
    if (!pendingContribution) return;

    setCoveredCents((current) => Math.min(accountCents, current + pendingContribution.amountCents));
    setLastContribution(pendingContribution.amountCents / 100);
    setPendingContribution(null);
    setContributionAmount("");
  }

  return (
    <form className="partial-contribution-form" onSubmit={handleCreatePayment}>
      <div className="partial-balance-marker" aria-live="polite">
        <div className="partial-balance-values">
          <strong>{remainingCents > 0 ? `Ainda faltam ${formatCurrency(remainingCents / 100, 2)}` : "Conta quitada nesta simulação"}</strong>
          <span>{formatCurrency(coveredCents / 100, 2)} de {formatCurrency(accountAmount, 2)} cobertos</span>
        </div>
        <div
          className="partial-balance-progress"
          role="progressbar"
          aria-label="Progresso fictício da contribuição parcial"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        {validProposal && (
          <p>Com mais {formatCurrency(proposedCents / 100, 2)}, faltariam {formatCurrency(remainingAfterProposal / 100, 2)}.</p>
        )}
      </div>
      {!pendingContribution && remainingCents > 0 && (
        <>
          <label className="supporter-field" htmlFor="partial-contribution-amount">
            Valor da contribuição pontual
            <span className="supporter-amount-input">
              <span aria-hidden="true">R$</span>
              <input
                id="partial-contribution-amount"
                name="amount"
                type="number"
                min="0.01"
                max={remainingCents / 100}
                step="0.01"
                value={contributionAmount}
                onChange={(event) => setContributionAmount(event.target.value)}
                required
              />
            </span>
          </label>
          <p>Até {formatCurrency(remainingCents / 100)} restantes · pagamento fictício nesta prévia.</p>
          <button className="button" type="submit">Gerar QR de demonstração</button>
        </>
      )}
      {pendingContribution && (
        <div className="pending-contribution">
          <DemoQrCode label={`QR Code fictício de ${formatCurrency(pendingContribution.amountCents / 100, 2)} para a conta ${accountSlug}; não pagável`} />
          <div className="pending-contribution-details">
            <strong>QR Code não pagável</strong>
            <span>Valor demonstrativo: {formatCurrency(pendingContribution.amountCents / 100, 2)}</span>
            <span>Conta: {accountSlug}</span>
            <code>Referência: {pendingContribution.reference}</code>
            <span>Em produção, o provedor emitirá o QR e confirmará o pagamento por webhook.</span>
            <DemoPixCopyButton reference={pendingContribution.reference} amountCents={pendingContribution.amountCents} />
          </div>
          <button className="button" type="button" onClick={simulatePaymentConfirmation}>
            Simular confirmação do pagamento
          </button>
          <button className="pending-contribution-cancel" type="button" onClick={() => setPendingContribution(null)}>
            Cancelar simulação
          </button>
        </div>
      )}
      {remainingCents === 0 && !pendingContribution && <p role="status">Conta quitada nesta simulação.</p>}
      {lastContribution !== null && (
        <p className="partial-contribution-confirmation" role="status">
          Contribuição demonstrativa de {formatCurrency(lastContribution, 2)} registrada. {remainingCents > 0 ? `Ainda faltam ${formatCurrency(remainingCents / 100, 2)}.` : "A conta foi quitada nesta simulação."} Nenhum pagamento foi iniciado.
        </p>
      )}
    </form>
  );
}
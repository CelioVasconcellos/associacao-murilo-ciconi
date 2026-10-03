import Link from "next/link";
import DemoQrCode from "@/components/demo-qr-code";
import DemoPixCopyButton from "@/components/demo-pix-copy-button";
import type { DemoFamily } from "@/data/demo-families";
import { formatCurrency, formatDueDate } from "@/data/demo-families";

type AccountCardProps = {
  family: DemoFamily;
  isOverdue?: boolean;
};

export default function AccountCard({ family, isOverdue }: AccountCardProps) {
  const progress = Math.min(100, Math.round((family.account.covered / family.account.amount) * 100));

  return (
    <article className="account-card">
      <div className="account-card-top">
        <span className="account-category">{family.account.category}</span>
        <span className="account-status">Exemplo fictício</span>
      </div>
      <Link
        className="account-household"
        href={`/familias/${family.slug}`}
        aria-label={`Ler a história fictícia de ${family.patientName}, da ${family.label}`}
      >
        <span>{family.label}</span>
        <span className="account-patient">{family.patientName}, {family.patientAge} anos</span>
      </Link>
      <h3>{family.account.title}</h3>
      <p className="account-description">{family.account.description}</p>
      <div className="account-card-bottom">
        <div className="account-values">
          <span>Valor demonstrativo</span>
          <strong>{formatCurrency(family.account.amount)}</strong>
        </div>
        <div
          className="account-progress"
          role="progressbar"
          aria-label={`Progresso demonstrativo da conta de ${family.label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="account-values" style={{ marginTop: 7 }}>
          <span>{formatCurrency(family.account.covered)} de exemplo</span>
          <span className={isOverdue === true ? "account-due-overdue" : "account-due"}>
            {isOverdue === true ? "Vencida" : isOverdue === false ? "Vence em" : "Vencimento"} {formatDueDate(family.account.dueDate)}
          </span>
        </div>
        <div className="account-card-payment">
          <DemoQrCode compact label={`QR Code fictício para pagamento integral da ${family.account.title}; não permite pagamento`} />
          <div>
            <strong>Pagar conta inteira</strong>
            <span>QR demonstrativo · não pagável</span>
            <DemoPixCopyButton compact reference={`${family.slug}-integral`} amountCents={family.account.amount * 100} />
            <Link href={`/familias/${family.slug}#contribuicao-parcial`}>Contribuir parcialmente</Link>
          </div>
        </div>
        <Link className="account-card-link" href={`/familias/${family.slug}`}>
          <span>Ler história demonstrativa</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
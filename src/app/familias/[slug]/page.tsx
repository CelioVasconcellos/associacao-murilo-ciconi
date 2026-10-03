import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoQrCode from "@/components/demo-qr-code";
import DemoPixCopyButton from "@/components/demo-pix-copy-button";
import PartialContributionForm from "@/components/partial-contribution-form";
import { demoFamilies, formatCurrency, formatDueDate } from "@/data/demo-families";

type FamilyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return demoFamilies.map((family) => ({ slug: family.slug }));
}

export async function generateMetadata({ params }: FamilyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const family = demoFamilies.find((item) => item.slug === slug);
  if (!family) return { title: "Perfil não encontrado" };
  return { title: family.label, description: family.headline };
}

export default async function FamilyProfilePage({ params }: FamilyPageProps) {
  const { slug } = await params;
  const family = demoFamilies.find((item) => item.slug === slug);
  if (!family) notFound();

  const progress = Math.min(100, Math.round((family.account.covered / family.account.amount) * 100));

  return (
    <>
      <section className="profile-hero">
        <div className="profile-emblem">
          <span className="profile-monogram" aria-hidden="true">{family.patientName.slice(0, 1)}</span>
          <span className="profile-emblem-caption">Identidade ilustrativa</span>
        </div>
        <div className="profile-copy">
          <span className="eyebrow">Perfil demonstrativo · {family.label}</span>
          <h1 className="profile-title">{family.headline}</h1>
          <p className="profile-person">
            <strong>{family.patientName}, {family.patientAge} anos</strong>
            <span>Acompanhamento familiar: {family.caregiver}</span>
          </p>
          <p>{family.account.description}</p>
          <span className="profile-disclaimer">História, nomes e valores fictícios · nenhuma doação é processada</span>
        </div>
      </section>
      <section className="profile-content">
        <div className="profile-story">
          <h2>Uma história contada com cuidado</h2>
          {family.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <Link className="back-link" href="/vitrine">Voltar para a vitrine</Link>
        </div>
        <aside className="profile-need" aria-label="Necessidade demonstrativa">
          <p className="profile-need-label">Conta em destaque · {family.account.category}</p>
          <h3>{family.account.title}</h3>
          <p>Vencimento demonstrativo: {formatDueDate(family.account.dueDate)} · Necessidade e valores fictícios.</p>
          <div className="account-values" style={{ marginTop: 20 }}>
            <span>Progresso inicial demonstrativo</span>
            <strong>{progress}%</strong>
          </div>
          <div
            className="account-progress"
            role="progressbar"
            aria-label={`Progresso fictício da conta de ${family.label}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="account-values" style={{ marginTop: 9 }}>
            <span>{formatCurrency(family.account.covered)} já cobertos no exemplo</span>
            <span>Total {formatCurrency(family.account.amount)}</span>
          </div>
          <div className="profile-payment" id="pagamento-integral">
            <DemoQrCode label={`QR Code fictício para pagar integralmente ${family.account.title}; não permite pagamento`} />
            <div>
              <strong>Pagar a conta inteira</strong>
              <span>{formatCurrency(family.account.amount)} · valor demonstrativo</span>
              <span>QR Code fictício · não pagável</span>
              <DemoPixCopyButton reference={`${family.slug}-integral`} amountCents={family.account.amount * 100} />
            </div>
          </div>
          <Link className="button profile-partial-link" href="#contribuicao-parcial">
            Contribuir com parte da conta
          </Link>
          <div className="profile-update">
            <strong>{family.update.title}</strong>
            <p>{family.update.text}</p>
          </div>
        </aside>
      </section>
      <section className="partial-contribution-section" id="contribuicao-parcial">
        <div className="partial-contribution-copy">
          <span className="eyebrow">Contribuição pontual</span>
          <h2>Prefere apoiar com uma parte?</h2>
          <p>Escolha um valor para esta necessidade específica. Esta opção é separada do apoio mensal à Rede de R$ 10.</p>
        </div>
        <PartialContributionForm
          key={family.slug}
          accountAmount={family.account.amount}
          initialCovered={family.account.covered}
          accountSlug={family.slug}
        />
      </section>
    </>
  );
}
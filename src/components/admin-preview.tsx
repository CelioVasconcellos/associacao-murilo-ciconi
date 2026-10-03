"use client";

import { useState } from "react";
import Link from "next/link";
import type { DemoFamily } from "@/data/demo-families";
import { formatCurrency, formatDueDate } from "@/data/demo-families";

type AdminSection = "families" | "accounts" | "payments" | "access";

type AdminPreviewProps = {
  families: DemoFamily[];
};

const reviewStates: Record<string, { review: string; consent: string }> = {
  "familia-horizonte": { review: "Em revisão demonstrativa", consent: "Consentimento fictício" },
  "familia-caminho": { review: "Rascunho demonstrativo", consent: "A conferir" },
  "familia-abrigo": { review: "Aguardando revisão", consent: "Consentimento fictício" },
};

const sections: { id: AdminSection; label: string }[] = [
  { id: "families", label: "Famílias" },
  { id: "accounts", label: "Contas" },
  { id: "payments", label: "Recebimentos" },
  { id: "access", label: "Acessos" },
];

const roleGuidance = [
  { role: "Responsável", access: "Gerencia equipe, configurações e todos os registros." },
  { role: "Coordenação", access: "Organiza cadastros e contas; não altera permissões de acesso." },
  { role: "Edição", access: "Prepara histórias e atualizações em rascunho." },
  { role: "Revisão", access: "Confere consentimentos e aprova publicações." },
  { role: "Financeiro", access: "Concilia contas e pagamentos, sem acesso ao conteúdo das histórias." },
];

export default function AdminPreview({ families }: AdminPreviewProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>("families");

  return (
    <div className="admin-preview">
      <div className="admin-preview-warning" role="status">
        <strong>Prévia pública, sem autenticação e sem persistência.</strong>
        <span>Use somente para conhecer os fluxos. Não insira dados de famílias, saúde, contato ou pagamento.</span>
      </div>

      <header className="admin-preview-header">
        <div>
          <span className="eyebrow">Área de gestão · demonstração</span>
          <h1>Painel administrativo</h1>
          <p>Estrutura de trabalho proposta para a equipe da Associação. Nenhuma alteração desta página é salva.</p>
        </div>
        <span className="admin-preview-badge">Acesso real desativado</span>
      </header>

      <div className="admin-preview-summary" aria-label="Resumo demonstrativo">
        <div><strong>{families.length}</strong><span>famílias fictícias</span></div>
        <div><strong>{families.length}</strong><span>contas demonstrativas</span></div>
        <div><strong>0</strong><span>cadastros persistidos</span></div>
      </div>

      <div className="admin-preview-tabs" role="tablist" aria-label="Seções do painel">
        {sections.map((section) => (
          <button
            aria-controls={`admin-panel-${section.id}`}
            aria-selected={activeSection === section.id}
            id={`admin-tab-${section.id}`}
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            role="tab"
            type="button"
          >
            {section.label}
          </button>
        ))}
      </div>

      {activeSection === "families" && (
        <section aria-labelledby="admin-tab-families" className="admin-preview-panel" id="admin-panel-families" role="tabpanel">
          <div className="admin-preview-section-heading">
            <div>
              <h2>Cadastro e revisão</h2>
              <p>Publicação exige consentimento vigente e revisão por uma pessoa autorizada.</p>
            </div>
            <button className="admin-disabled-action" disabled type="button">Novo cadastro · indisponível</button>
          </div>
          <div className="admin-preview-table-wrap">
            <table className="admin-preview-table">
              <thead><tr><th>Nome público</th><th>Necessidade</th><th>Etapa editorial</th><th>Consentimento</th><th></th></tr></thead>
              <tbody>
                {families.map((family) => {
                  const state = reviewStates[family.slug] ?? { review: "Rascunho demonstrativo", consent: "A conferir" };
                  return (
                    <tr key={family.slug}>
                      <td><strong>{family.label}</strong><span>{family.patientName}, {family.patientAge} anos · fictício</span></td>
                      <td>{family.account.title}</td>
                      <td>{state.review}</td>
                      <td>{state.consent}</td>
                      <td><Link href={`/familias/${family.slug}`}>Ver prévia</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <fieldset className="admin-disabled-form" disabled>
            <legend>Campos previstos para uma nova ficha · indisponíveis nesta prévia</legend>
            <div className="admin-disabled-fields">
              <label>Nome público<input placeholder="Ex.: Família Exemplo" /></label>
              <label>Necessidade da casa<input placeholder="Ex.: Conta de consumo" /></label>
              <label>História autorizada<textarea placeholder="Texto aprovado pela família" rows={3} /></label>
              <label className="admin-consent-check"><input type="checkbox" /> Consentimento verificado pela equipe</label>
            </div>
          </fieldset>
        </section>
      )}

      {activeSection === "accounts" && (
        <section aria-labelledby="admin-tab-accounts" className="admin-preview-panel" id="admin-panel-accounts" role="tabpanel">
          <div className="admin-preview-section-heading">
            <div>
              <h2>Contas e necessidades</h2>
              <p>Valores, vencimentos e coberturas abaixo são exemplos inventados.</p>
            </div>
            <button className="admin-disabled-action" disabled type="button">Nova conta · indisponível</button>
          </div>
          <div className="admin-preview-table-wrap">
            <table className="admin-preview-table">
              <thead><tr><th>Conta</th><th>Família</th><th>Vencimento</th><th>Total</th><th>Coberto no exemplo</th><th>Estado</th></tr></thead>
              <tbody>
                {families.map((family) => (
                  <tr key={family.slug}>
                    <td><strong>{family.account.title}</strong><span>Referência fictícia · {family.slug}</span></td>
                    <td>{family.label}</td>
                    <td>{formatDueDate(family.account.dueDate)}</td>
                    <td>{formatCurrency(family.account.amount, 2)}</td>
                    <td>{formatCurrency(family.account.covered, 2)}</td>
                    <td>Demonstrativo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeSection === "payments" && (
        <section aria-labelledby="admin-tab-payments" className="admin-preview-panel" id="admin-panel-payments" role="tabpanel">
          <div className="admin-preview-section-heading">
            <div>
              <h2>Recebimentos e conciliação</h2>
              <p>O saldo real só deverá mudar após confirmação autenticada do provedor.</p>
            </div>
            <span className="admin-preview-badge">Provedor não configurado</span>
          </div>
          <div className="admin-preview-table-wrap">
            <table className="admin-preview-table">
              <thead><tr><th>Referência</th><th>Conta</th><th>Valor</th><th>Meio</th><th>Estado</th></tr></thead>
              <tbody>
                <tr><td><code>DEMO-FAMILIA-ABRIGO-001</code></td><td>Recarga de gás</td><td>R$ 50,00</td><td>Pix · fictício</td><td>Aguardando confirmação simulada</td></tr>
                <tr><td><code>DEMO-FAMILIA-HORIZONTE-002</code></td><td>Conta de luz</td><td>R$ 25,00</td><td>Cartão · fictício</td><td>Exemplo sem cobrança</td></tr>
              </tbody>
            </table>
          </div>
          <p className="admin-preview-note">Referências e estados são ilustrativos; não correspondem a transações bancárias.</p>
        </section>
      )}

      {activeSection === "access" && (
        <section aria-labelledby="admin-tab-access" className="admin-preview-panel" id="admin-panel-access" role="tabpanel">
          <div className="admin-preview-section-heading">
            <div>
              <h2>Matriz inicial de acesso</h2>
              <p>Proposta para revisão da Associação; não representa permissões já configuradas.</p>
            </div>
          </div>
          <div className="admin-preview-table-wrap">
            <table className="admin-preview-table">
              <thead><tr><th>Papel proposto</th><th>Permissão de referência</th></tr></thead>
              <tbody>
                {roleGuidance.map((item) => <tr key={item.role}><td><strong>{item.role}</strong></td><td>{item.access}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className="admin-preview-note">O login real deverá usar um provedor de identidade, sessão segura e contas individuais. Senhas não serão armazenadas neste aplicativo.</p>
        </section>
      )}
    </div>
  );
}
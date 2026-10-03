# associacao-murilo-ciconi

Repositório oficial da Associação Murilo Ciconi - Código e arquivos do site institucional.

## Aplicação

Aplicação full-stack em Next.js. A interface e a lógica de servidor ficam no mesmo projeto e são publicadas como um único serviço web.

## Desenvolvimento local

```bash
npm ci
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). As páginas e os dados atuais são demonstrativos; ainda não há persistência em banco de dados. O painel de fluxo administrativo pode ser visto em `/gestao-demo`; ele é público, não tem login e não deve receber dados reais.

## Prévia pública gratuita no Render

O arquivo `render.yaml` configura um único Web Service Node no plano Free, já conectado a este repositório e à branch `main` com deploy automático por commit.

Prévia publicada: [associacao-murilo-ciconi.onrender.com](https://associacao-murilo-ciconi.onrender.com).

Prévia do painel administrativo: [associacao-murilo-ciconi.onrender.com/gestao-demo](https://associacao-murilo-ciconi.onrender.com/gestao-demo). A rota é somente demonstrativa e não está protegida por autenticação; não usar com informações reais.

- Build: `npm ci && npm run build`
- Start: `npm run start`

O serviço Free dorme após 15 minutos sem acessos e pode levar cerca de um minuto para responder ao próximo visitante. Seu sistema de arquivos é temporário; por isso, esta prévia usa apenas dados fictícios e não depende de armazenamento persistente.

O plano de tarefas antes e depois do CNPJ está registrado em [`PLANO-DE-ACAO.md`](PLANO-DE-ACAO.md).

Não usar o plano gratuito como base para dados reais: o PostgreSQL gratuito do Render expira após 30 dias e não oferece backups. Para login, administração, cadastro de famílias e recebimentos reais, usar um banco PostgreSQL persistente com backups e manter as credenciais nas variáveis de ambiente do serviço, nunca no repositório. O backend pode ser adicionado ao mesmo projeto Next.js; não é obrigatório criar um segundo serviço para a API.

## Preparação para pagamentos

O fluxo de contribuição pontual atual é apenas uma demonstração no navegador. O QR exibido não contém dados de pagamento, a referência `DEMO-*` não é persistida e a confirmação é simulada. Nenhuma doação é iniciada ou contabilizada fora da página.

Os esquemas preparatórios estão em `db/migrations/001_payments.sql` (contas, contribuições e eventos idempotentes de webhook) e `db/migrations/002_families_and_admin.sql` (famílias, perfis editoriais, consentimentos, identidades administrativas e auditoria). Eles ainda não foram aplicados porque não há banco configurado. Os valores são armazenados em centavos; dados de cartão e payloads brutos de webhook não devem ser armazenados pela aplicação.

Antes de aceitar pagamentos reais, será necessário:

- obter o CNPJ e abrir/validar uma conta de recebimento da Associação;
- escolher o provedor e confirmar taxas, elegibilidade e os métodos habilitados para cobrança pontual;
- criar PostgreSQL no Render e aplicar a migração;
- implementar a criação server-side da contribuição pendente e do QR Pix dinâmico, vinculados à conta e a uma referência única;
- validar a autenticidade dos webhooks do provedor, deduplicar eventos e atualizar o saldo somente após confirmação do pagamento;
- testar valores, expiração, pagamentos duplicados, recusas e cancelamentos em sandbox antes de habilitar produção.

Cartão recorrente, Pix Automático e Pix pontual são fluxos diferentes. Não ativar cobranças mensais a partir do fluxo pontual descrito acima.
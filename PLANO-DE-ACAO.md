# Plano de ação

Atualizado em 03/10/2026. Este plano acompanha a evolução da prévia até a operação real. Nenhum item abaixo autoriza receber dados de saúde ou pagamentos reais antes das condições de entrada em produção.

## Já concluído

- Site Next.js publicado no Render Free: https://associacao-murilo-ciconi.onrender.com
- Repositório conectado ao Render, com deploy automático pela branch `main`.
- Vitrine, três histórias fictícias, ordenação por vencimento e valor, formulário demonstrativo de apoio mensal e fluxo demonstrativo de contribuição parcial.
- Prévia administrativa em `/gestao-demo` com abas de famílias, contas, recebimentos e matriz de acesso. É pública, usa registros fictícios e não salva alterações.
- QR Codes e textos de Pix copia e cola são fictícios e não pagáveis.
- Esquemas iniciais de pagamentos, famílias, consentimentos, papéis administrativos e auditoria em `db/migrations/001_payments.sql` e `db/migrations/002_families_and_admin.sql`; ainda não aplicados a um banco.

## Antes do CNPJ

Estas atividades podem avançar sem abrir cobranças nem armazenar dados pessoais reais.

- [ ] Apresentar a prévia aos parceiros e registrar decisões, dúvidas e ajustes de fluxo.
- [ ] Validar com a Associação a matriz de papéis proposta em `/gestao-demo`: responsável, coordenação, edição, revisão e financeiro.
- [ ] Aprovar o processo de entrada de famílias: consentimento do responsável, revisão antes da publicação, atualização e remoção de dados.
- [ ] Preparar política de privacidade, termos de contribuição e regras de cancelamento com revisão jurídica, considerando dados de saúde e dados de crianças como sensíveis.
- [ ] Solicitar propostas escritas de taxas e elegibilidade a provedores para Pix dinâmico, Pix Automático e cartão; separar cobrança pontual de recorrência.
- [ ] Decidir se haverá opção de Pix agendado pelo apoiador como alternativa sem cobrança automática da Associação.
- [ ] Reavaliar as cinco vulnerabilidades altas no toolchain de desenvolvimento. `npm audit --omit=dev` encontrou zero vulnerabilidades de produção; `npm audit fix --dry-run` só oferece correção forçada que rebaixa `eslint-config-next` para 14.2.35, incompatível com o Next 16 atual. Aguardar correção compatível ou atualizar a cadeia com testes, sem `--force`.
- [ ] Manter a prévia sem cadastro persistente, documentos, dados bancários ou pagamentos reais.

## Depois do CNPJ

Executar na ordem abaixo; não publicar dados reais nem habilitar cobrança antes de completar as etapas de segurança e teste.

1. Abrir e validar a conta PJ da Associação e confirmar titularidade, recebimento, tarifas e responsáveis autorizados.
2. Comparar e escolher o provedor com base em taxas líquidas, métodos disponíveis, cancelamento, estorno, suporte e aprovação para a entidade.
3. Contratar PostgreSQL persistente com backups e retenção adequada. Não usar o banco gratuito de 30 dias do Render para produção.
4. Configurar `DATABASE_URL` e segredos do provedor nas variáveis privadas do Render; nunca versioná-los.
5. Revisar e aplicar `db/migrations/001_payments.sql` e `db/migrations/002_families_and_admin.sql`; ajustar o esquema às decisões jurídicas e operacionais finais.
6. Implementar login administrativo com controle de acesso por função, sessão segura, recuperação de acesso e trilha de auditoria. Antes de inserir qualquer dado real, proteger ou remover `/gestao-demo`; `noindex` não substitui autenticação.
7. Implementar cadastro de famílias e contas com validação, consentimento registrado, revisão editorial, minimização de dados e remoção controlada; impedir publicação sem consentimento vigente para a história e a necessidade divulgadas.
8. Implementar contribuição pontual: criar cobrança no servidor, associar valor e conta a uma referência única, entregar QR dinâmico/copia e cola do provedor e manter estado pendente.
9. Receber webhooks autenticados e idempotentes; só atualizar saldo em estado confirmado. Tratar duplicidade, expiração, recusa, estorno e conciliação.
10. Implementar cartão recorrente e Pix Automático como fluxos separados, com autorização explícita do apoiador e processo de cancelamento.
11. Testar em sandbox os fluxos completos, falhas, reenvio de webhooks, valores parciais e quitação. Fazer revisão de segurança, restauração de backup e validação operacional.
12. Fazer uma liberação controlada para produção após aprovação jurídica, financeira e técnica; retirar avisos de prévia somente quando os fluxos reais estiverem confirmados.

## Critério para produção

Produção só começa com CNPJ ativo, conta recebedora aprovada, provedor escolhido e homologado, banco persistente com backup, políticas publicadas, consentimentos definidos, administração protegida e pagamentos confirmados por webhook em testes. Até lá, todo QR, referência, valor coberto e confirmação devem permanecer demonstrativos.
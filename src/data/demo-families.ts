export type DemoFamily = {
  slug: string;
  label: string;
  patientName: string;
  patientAge: number;
  caregiver: string;
  headline: string;
  story: string[];
  account: {
    category: string;
    title: string;
    description: string;
    amount: number;
    covered: number;
    dueDate: string;
  };
  update: {
    title: string;
    text: string;
  };
};

export const demoFamilies: DemoFamily[] = [
  {
    slug: "familia-horizonte",
    label: "Família Horizonte",
    patientName: "Tomás",
    patientAge: 9,
    caregiver: "Helena, sua mãe",
    headline: "A rotina de casa também faz parte do cuidado",
    story: [
      "Tomás, 9 anos, está em acompanhamento de saúde e retorna ao hospital com frequência. Quando está em casa, gosta de desenhar plantas de casas e inventar nomes para cada uma.",
      "Helena, sua mãe, acompanha as consultas e reorganiza a rotina entre deslocamentos, trabalho e tarefas da casa. Ela procura preservar os horários e os pequenos momentos que fazem os dias parecerem familiares.",
      "Neste perfil, a conta de energia aparece como uma despesa demonstrativa. Em uma publicação real, cada necessidade seria conferida com a família, apresentada com autorização e atualizada com transparência.",
    ],
    account: {
      category: "Energia",
      title: "Conta de luz",
      description: "Despesa ilustrativa de uma casa cuja rotina está sendo reorganizada para acompanhar um tratamento de saúde.",
      amount: 840,
      covered: 510,
      dueDate: "2026-09-30",
    },
    update: {
      title: "Atualização demonstrativa",
      text: "Em uma situação real, a equipe confirmaria a necessidade e os dados da conta com a família antes de publicar qualquer atualização.",
    },
  },
  {
    slug: "familia-caminho",
    label: "Família Caminho",
    patientName: "Nina",
    patientAge: 11,
    caregiver: "Paulo, seu pai",
    headline: "Um passo de cada vez, com espaço para seguir sendo criança",
    story: [
      "Nina, 11 anos, está em um período de acompanhamento que exige retornos frequentes ao hospital. Ela costuma levar um livro na mochila e continuar a leitura durante os trajetos.",
      "Paulo, seu pai, planeja as idas às consultas junto às responsabilidades de casa. Manter o aluguel em dia também ajuda a preservar um lugar conhecido para Nina descansar, estudar e estar com a família.",
      "A parcela de aluguel é uma necessidade fictícia desta demonstração. A história mostra como um apoio pontual poderia ser explicado sem expor endereço, documentos ou informações clínicas.",
    ],
    account: {
      category: "Moradia",
      title: "Parcela do aluguel",
      description: "Exemplo de despesa de moradia durante um período de consultas e acompanhamento frequentes.",
      amount: 1500,
      covered: 960,
      dueDate: "2026-10-08",
    },
    update: {
      title: "Atualização demonstrativa",
      text: "Em uma situação real, a família escolheria quais informações compartilhar, e todo dado seria conferido antes da publicação.",
    },
  },
  {
    slug: "familia-abrigo",
    label: "Família Abrigo",
    patientName: "Davi",
    patientAge: 6,
    caregiver: "Joana, sua mãe",
    headline: "Cuidado também é preservar a vida de todos os dias",
    story: [
      "Davi, 6 anos, está em acompanhamento de saúde. Em casa, gosta de ajudar a escolher o jantar e de contar à irmã mais velha o que aprendeu naquele dia.",
      "Joana, sua mãe, organiza a rotina entre consultas, refeições e os compromissos da filha. Pequenos hábitos ajudam as crianças a manter momentos de convivência mesmo em um período diferente.",
      "A recarga de gás aparece aqui como exemplo de uma despesa doméstica. O valor, a história e o progresso são fictícios; nenhuma contribuição é recebida nesta página.",
    ],
    account: {
      category: "Gás",
      title: "Recarga de gás",
      description: "Despesa doméstica demonstrativa para mostrar como uma necessidade cotidiana pode ser apresentada.",
      amount: 180,
      covered: 0,
      dueDate: "2026-10-25",
    },
    update: {
      title: "Atualização demonstrativa",
      text: "Em um caso real, a página informaria apenas o andamento confirmado da necessidade, sempre com autorização da família.",
    },
  },
];

export function formatCurrency(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits,
  }).format(value);
}

export function formatDueDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
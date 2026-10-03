import Link from "next/link";
import AccountCard from "@/components/account-card";
import { demoFamilies } from "@/data/demo-families";

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">Cuidado que chega até a casa</span>
          <h1 id="hero-title">Enquanto o hospital cuida da saúde, <em>ajudamos a manter o lar em pé.</em></h1>
          <p className="hero-text">Uma rede de apoio para que famílias atravessem o tratamento sem carregar sozinhas o peso das contas essenciais.</p>
          <div className="hero-actions">
            <Link className="button" href="/vitrine">Quero Ajudar</Link>
            <Link className="button button-light" href="#apoio">Preciso de Apoio</Link>
          </div>
          <p className="hero-note">Nesta prévia, todos os casos e valores são fictícios.</p>
        </div>
        <div className="hero-visual" role="img" aria-label="Imagem ilustrativa da fachada de uma moradia familiar">
          <span className="hero-index">01 / 03</span>
          <div className="hero-image-caption">
            <span>Quem está em tratamento no hospital, precisa de um lar em pé para voltar.</span>
            <span className="image-label">Imagem ilustrativa</span>
          </div>
        </div>
      </section>

      <section className="manifesto-section" id="causa" aria-labelledby="manifesto-title">
        <div className="manifesto-heading">
          <span className="eyebrow">A causa · Nossa história</span>
          <h2 id="manifesto-title">Para voltar, é preciso que o lar continue em pé.</h2>
          <Link className="text-link" href="#contas">Veja como o apoio pode chegar</Link>
        </div>
        <div className="manifesto-copy">
          <p>Ninguém espera receber a notícia de que alguém da família tem uma doença grave. O diagnóstico abala a rotina e os alicerces de qualquer casa, principalmente de famílias que já enfrentam dificuldades.</p>
          <p>O tratamento de uma criança costuma exigir a presença constante de uma pessoa cuidadora. Muitas vezes, alguém precisa reduzir ou interromper o trabalho. A renda da casa diminui, enquanto aluguel, água, luz, gás e transporte continuam sendo necessários.</p>
          <p>Para mães solo, esse peso pode se concentrar ainda mais. Doações de alimentos são essenciais, mas não cobrem todas as necessidades que mantêm uma família em casa durante um tratamento longo.</p>
          <p className="manifesto-emphasis">Apoiar também é ajudar a manter o lar em pé, até que a família possa retomar sua rotina.</p>
        </div>
      </section>

      <div className="stat-ribbon" aria-label="Dados institucionais demonstrativos">
        <div className="stat-intro">Acolher é cuidar do caminho inteiro.</div>
        <div className="stat-item"><strong>1.000</strong><span>meta inicial de apoiadores, sem limite</span></div>
        <div className="stat-item"><strong>R$ 10</strong><span>contribuição mensal mínima</span></div>
        <div className="stat-item"><strong>Todo mês</strong><span>mais previsibilidade para a rede</span></div>
      </div>

      <section className="section network-section" id="rede">
        <div className="section-heading">
          <span className="eyebrow">Uma rede, muitos gestos</span>
          <h2>Uma meta de 1.000 apoiadores. Contribuições a partir de R$ 10.</h2>
          <p>A meta inicial é reunir 1.000 apoiadores, mas a rede permanece aberta a mais pessoas. A contribuição mensal mínima é de R$ 10 e não há teto: cada apoiador escolhe o valor com que deseja contribuir. Os números desta página são ilustrativos e não representam adesões reais.</p>
        </div>
        <div className="network-figure">
          <div className="network-figure-top">
            <div className="network-count">327 <small>/ 1.000</small></div>
            <span className="demo-tag">Dado fictício</span>
          </div>
          <div className="progress-track" role="progressbar" aria-label="Indicador fictício em relação à meta inicial de 1.000 apoiadores" aria-valuemin={0} aria-valuemax={1000} aria-valuenow={327}>
            <div className="progress-fill" style={{ width: "32.7%" }} />
          </div>
          <p>Indicador fictício · meta inicial, sem limite de apoiadores ou de contribuição</p>
          <Link className="button button-light" href="/apoiar">Quero fazer parte da rede</Link>
        </div>
      </section>

      <section className="section" id="contas">
        <div className="section-topline">
          <div className="section-heading">
            <span className="eyebrow">Apadrinhamento direto</span>
            <h2>Uma conta de cada vez.</h2>
            <p>Exemplos de como uma necessidade pode ser apresentada com contexto, valor e transparência.</p>
          </div>
          <Link className="text-link" href="/vitrine">Ver a vitrine completa</Link>
        </div>
        <div className="account-grid">
          {demoFamilies.slice(0, 3).map((family) => <AccountCard key={family.slug} family={family} />)}
        </div>
      </section>

      <section className="section section-white">
        <div className="section-topline">
          <div className="section-heading">
            <span className="eyebrow">Palavras de acolhimento</span>
            <h2>Solidariedade que respeita a história.</h2>
          </div>
          <span className="demo-tag">Relatos ilustrativos</span>
        </div>
        <div className="testimonials">
          <figure className="testimonial">
            <blockquote>“Quando a rotina muda, saber que alguém também está olhando para a casa faz diferença.”</blockquote>
            <figcaption>Relato composto fictício · pessoa cuidadora</figcaption>
          </figure>
          <figure className="testimonial">
            <blockquote>“A ajuda mais importante foi poder respirar e estar presente no que realmente precisava de mim.”</blockquote>
            <figcaption>Relato composto fictício · família atendida</figcaption>
          </figure>
        </div>
      </section>

      <section className="support-band" id="apoio">
        <div>
          <span className="eyebrow">Precisa de apoio?</span>
          <h2>O acolhimento começa com escuta.</h2>
          <p>O canal de solicitação ainda será definido junto com a equipe da Associação. Esta prévia não recebe pedidos e não deve ser usada para enviar informações pessoais ou de saúde.</p>
        </div>
        <Link className="button" href="/vitrine">Conhecer o projeto</Link>
      </section>
    </>
  );
}

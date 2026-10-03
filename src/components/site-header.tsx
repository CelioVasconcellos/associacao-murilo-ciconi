import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Associação Murilo Ciconi, página inicial">
        <Image
          className="brand-mark"
          src="/logo-associacao-murilo-ciconi.png"
          alt=""
          width={384}
          height={384}
        />
        <span className="brand-name">
          <strong>Associação Murilo Ciconi</strong>
          <span>Apoio que mantém o lar</span>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Navegação principal">
        <Link href="/#causa">A causa</Link>
        <Link href="/vitrine">Vitrine de contas</Link>
        <Link href="/#rede">Rede de R$ 10</Link>
        <Link className="button nav-cta" href="/vitrine">Quero apoiar</Link>
        <Link className="nav-demo-link" href="/gestao-demo" aria-label="Abrir painel administrativo demonstrativo">Admin demo</Link>
      </nav>
    </header>
  );
}
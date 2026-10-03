import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-intro">
      <span className="eyebrow">Página indisponível</span>
      <h1>Este perfil não está nesta prévia.</h1>
      <p>Os perfis demonstrativos disponíveis podem ser encontrados na Vitrine de Contas.</p>
      <Link className="button" href="/vitrine" style={{ marginTop: 24 }}>Ir para a vitrine</Link>
    </section>
  );
}
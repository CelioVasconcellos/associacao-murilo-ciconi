import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" href="/">
        <Image
          className="footer-mark"
          src="/logo-associacao-murilo-ciconi.png"
          alt=""
          width={384}
          height={384}
        />
        <span>Associação Murilo Ciconi</span>
      </Link>
      <div className="footer-contact">
        <p><strong>CNPJ:</strong> 00.000.000/0000-00 <span>(fictício)</span></p>
        <p><strong>Telefone:</strong> (11) 00000-0000 <span>(fictício)</span></p>
      </div>
      <p className="footer-note">
        Protótipo conceitual com nomes, histórias, valores e indicadores fictícios. Nenhuma doação ou solicitação de apoio é processada.
      </p>
    </footer>
  );
}
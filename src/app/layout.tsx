import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Associação Murilo Ciconi | Cuidar também é manter o lar",
    template: "%s | Associação Murilo Ciconi",
  },
  description:
    "Uma rede de apoio demonstrativa para ajudar famílias a manter o lar durante o tratamento de uma criança.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="prototype-banner">
          <span className="prototype-dot" aria-hidden="true" />
          PRÉVIA DEMONSTRATIVA <span aria-hidden="true">·</span> NÃO RECEBE DOAÇÕES NEM PEDIDOS REAIS
        </div>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

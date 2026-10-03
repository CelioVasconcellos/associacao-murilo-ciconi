import type { Metadata } from "next";
import AdminPreview from "@/components/admin-preview";
import { demoFamilies } from "@/data/demo-families";

export const metadata: Metadata = {
  title: "Painel administrativo demonstrativo",
  description: "Prévia pública e fictícia dos fluxos de gestão da Associação.",
  robots: { index: false, follow: false },
};

export default function AdminPreviewPage() {
  return (
    <section className="admin-preview-section">
      <AdminPreview families={demoFamilies} />
    </section>
  );
}
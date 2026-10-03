"use client";

import { useState } from "react";

type DemoPixCopyButtonProps = {
  reference: string;
  amountCents: number;
  compact?: boolean;
};

export default function DemoPixCopyButton({ reference, amountCents, compact = false }: DemoPixCopyButtonProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "manual">("idle");
  const demoPayload = `DEMO-PIX|${reference}|${amountCents}`;

  async function copyDemoPayload() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(demoPayload);
      setCopyState("copied");
    } catch {
      setCopyState("manual");
    }
  }

  return (
    <div className={`pix-copy-action${compact ? " pix-copy-action-compact" : ""}`}>
      <button type="button" onClick={copyDemoPayload}>Copiar Pix copia e cola</button>
      {copyState === "copied" && (
        <span role="status">Código demonstrativo copiado. Não é válido para pagamento.</span>
      )}
      {copyState === "manual" && (
        <label>
          Código fictício, não pagável. Copie manualmente:
          <input
            aria-label="Código Pix demonstrativo, não pagável"
            readOnly
            value={demoPayload}
            onFocus={(event) => event.currentTarget.select()}
          />
        </label>
      )}
    </div>
  );
}
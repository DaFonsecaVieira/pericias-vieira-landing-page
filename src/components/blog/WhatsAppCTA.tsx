"use client";

import { MessageCircle } from "lucide-react";
import { GTAG_CONVERSION_ID, whatsappUrl } from "@/lib/constants";

interface WhatsAppCTAProps {
  message?: string;
  title?: string;
  variant?: "inline" | "block";
}

const DEFAULT_MESSAGE =
  "Olá! Li um artigo no blog da Signa Veritas e gostaria de saber mais sobre perícia grafotécnica.";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function trackConversion() {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Contact");
  window.gtag?.("event", "conversion", {
    send_to: GTAG_CONVERSION_ID,
    value: 5.0,
    currency: "BRL",
  });
}

export default function WhatsAppCTA({
  message = DEFAULT_MESSAGE,
  title = "Tem um caso com assinatura ou documento contestado?",
  variant = "inline",
}: WhatsAppCTAProps) {
  const href = whatsappUrl(message);

  if (variant === "block") {
    return (
      <div className="not-prose my-12 rounded-lg border border-accent/20 bg-white/5 p-8 text-center">
        <h3 className="font-heading text-2xl font-bold mb-3">{title}</h3>
        <p className="text-foreground/70 mb-6 max-w-xl mx-auto">
          Fale agora com o perito grafotécnico e tire suas dúvidas sobre o seu caso, sem compromisso.
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackConversion}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-primary font-bold py-4 px-8 rounded-sm transition-all"
        >
          <MessageCircle size={20} />
          Falar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="not-prose my-8 rounded-lg border border-white/10 bg-white/5 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
      <p className="text-sm text-foreground/80 font-medium">{title}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackConversion}
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-primary font-bold py-3 px-6 rounded-sm transition-all text-sm whitespace-nowrap"
      >
        <MessageCircle size={18} />
        Falar no WhatsApp
      </a>
    </div>
  );
}

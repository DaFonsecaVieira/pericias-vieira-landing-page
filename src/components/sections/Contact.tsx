"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { sendFacebookEvent } from "@/lib/facebook-events";

export default function Contact() {
    const handleContactClick = async (type: string) => {
        try {
            await sendFacebookEvent("Purchase", {
                // For a lead/contact, we can simulate a purchase or use 'Lead' event.
                // The user specifically requested the 'Purchase' payload.
                em: ["7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"]
            }, {
                currency: "BRL",
                value: "1500.00",
                contact_type: type
            });
        } catch (error) {
            console.error("Failed to track event:", error);
        }
    };

    return (
        <section id="contato" className="py-24 bg-primary relative overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass p-12 md:p-20 rounded-2xl relative overflow-hidden text-center max-w-5xl mx-auto border border-white/5 shadow-2xl"
                >
                    {/* Decorative background flare */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

                    <div className="relative z-10 space-y-10">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm block">
                            Entre em Contato
                        </span>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8">
                            Precisa de uma <span className="text-accent">Perícia Grafotécnica?</span>
                        </h2>
                        <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                            Solicite um orçamento sem compromisso. Atendemos demandas judiciais e
                            extrajudiciais em todo o território nacional.
                        </p>

                        <div className="flex justify-center pt-6">
                            <a
                                href="https://wa.me/5592981085357?text=Olá! Gostaria de solicitar um orçamento para perícia grafotécnica."
                                target="_blank"
                                rel="noopener"
                                className="bg-[#25D366] hover:bg-[#20bd5c] text-white font-bold py-4 px-10 rounded-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-500/10 group"
                                onClick={() => {
                                    handleContactClick("whatsapp");
                                    if (typeof window !== 'undefined' && (window as any).fbq) {
                                        (window as any).fbq('track', 'Contact');
                                    }
                                }}
                            >
                                <MessageCircle size={24} />
                                Fale pelo WhatsApp
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

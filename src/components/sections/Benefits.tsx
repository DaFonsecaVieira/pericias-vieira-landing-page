"use client";

import { motion } from "framer-motion";
import { Handshake, ShieldCheck, Landmark, Lock } from "lucide-react";

const benefits = [
    {
        title: "Auxílio ao Juiz",
        description: "Esclarecimento de questões técnicas fundamentais para a sentença.",
        icon: Landmark,
    },
    {
        title: "Prevenção de Fraudes",
        description: "Identificação precoce de irregularidades em documentos vitais.",
        icon: ShieldCheck,
    },
    {
        title: "Proteção de Patrimônio",
        description: "Garantia de que transações imobiliárias e financeiras sejam legítimas.",
        icon: Lock,
    },
    {
        title: "Segurança Jurídica",
        description: "Produção de prova técnica incontestável para defesa de direitos.",
        icon: Handshake,
    },
];

export default function Benefits() {
    return (
        <section id="beneficios" className="py-24 bg-primary/40 relative">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-accent font-bold tracking-widest uppercase text-sm"
                    >
                        Por que contratar?
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-heading font-bold mt-4 mb-6"
                    >
                        Benefícios do <span className="text-accent">Especialista</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-lg p-8 flex items-start gap-6 hover:bg-white/[0.08] transition-all group"
                        >
                            <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                                <benefit.icon className="text-accent" size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                                <p className="text-foreground/60 text-sm leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

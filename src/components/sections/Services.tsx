"use client";

import { motion } from "framer-motion";
import {
    FileEdit,
    FileSearch,
    FileText,
    Handshake,
    Scale,
    Gavel
} from "lucide-react";

const services = [
    {
        title: "Análise de Assinatura",
        description: "Verificação minuciosa para confirmar ou descartar a autenticidade de assinaturas em contratos, cheques e procurações.",
        icon: FileEdit,
    },
    {
        title: "Exame de Documentos",
        description: "Análise integral de documentos para detecção de rasuras, acréscimos, montagens ou qualquer tipo de adulteração.",
        icon: FileSearch,
    },
    {
        title: "Laudo Pericial",
        description: "Elaboração de laudo completo e robusto, fundamentado cientificamente para ser utilizado como prova inequívoca.",
        icon: FileText,
    },
    {
        title: "Assistência Técnica",
        description: "Acompanhamento de perícias judiciais, formulação de quesitos e análise crítica de laudos de peritos do juízo.",
        icon: Handshake,
    },
    {
        title: "Perícia Judicial",
        description: "Atuação como perito nomeado pelo juiz, fornecendo suporte técnico imparcial para a decisão judicial.",
        icon: Scale,
    },
    {
        title: "Perícia Extrajudicial",
        description: "Serviço preventivo para empresas e particulares, garantindo segurança antes de transações importantes.",
        icon: Gavel,
    },
];

export default function Services() {
    return (
        <section id="servicos" className="py-24 bg-primary/50 relative">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-accent font-bold tracking-widest uppercase text-sm"
                    >
                        Soluções Especializadas
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-heading font-bold mt-4 mb-6"
                    >
                        Nossos <span className="text-accent">Serviços</span>
                    </motion.h2>
                    <div className="w-20 h-1 bg-accent mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/[0.08] hover:border-accent/30 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <service.icon className="text-accent" size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                            <p className="text-foreground/60 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

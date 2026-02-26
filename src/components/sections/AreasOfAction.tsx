"use client";

import { motion } from "framer-motion";
import {
    Building2,
    Briefcase,
    Landmark,
    ShieldCheck,
    UserSquare2
} from "lucide-react";

const areas = [
    {
        title: "Judiciário",
        description: "Atuação como perito oficial nomeado pelo Tribunal de Justiça.",
        icon: Landmark,
    },
    {
        title: "Escritórios de Advocacia",
        description: "Assistência técnica para advogados em processos cíveis e criminais.",
        icon: Briefcase,
    },
    {
        title: "Instituições Financeiras",
        description: "Prevenção de fraudes em aberturas de conta e contratos bancários.",
        icon: Building2,
    },
    {
        title: "Empresas Privadas",
        description: "Auditoria de documentos internos e contratos de prestação de serviço.",
        icon: ShieldCheck,
    },
    {
        title: "Demandas Preventivas",
        description: "Consultoria para garantir a legitimidade de assinaturas em cartório.",
        icon: UserSquare2,
    },
];

export default function AreasOfAction() {
    return (
        <section id="atuacao" className="py-24 bg-primary relative">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-accent font-bold tracking-widest uppercase text-sm"
                    >
                        Presença e Alcance
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-heading font-bold mt-4 mb-6"
                    >
                        Áreas de <span className="text-accent">Atuação</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {areas.map((area, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-accent/30 transition-all group"
                        >
                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <area.icon className="text-accent" size={28} />
                            </div>
                            <h4 className="font-bold text-sm mb-2 group-hover:text-accent transition-colors">{area.title}</h4>
                            <p className="text-[10px] text-foreground/50 leading-tight">
                                {area.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

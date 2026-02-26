"use client";

import { motion } from "framer-motion";

const types = [
    {
        number: "01",
        title: "Imitação Livre",
        description: "O falsário tenta reproduzir a assinatura de memória, sem um modelo presente.",
    },
    {
        number: "02",
        title: "Imitação Servil",
        description: "Cópia feita com o modelo à vista, tentando reproduzir cada traço fielmente.",
    },
    {
        number: "03",
        title: "Decalque",
        description: "Uso de luz, carbono ou ponta seca para transferir os contornos da assinatura real.",
    },
    {
        number: "04",
        title: "Montagem / Recorte",
        description: "Uso de softwares ou recortes físicos para montar uma assinatura inexistente.",
    },
];

export default function FalsificationTypes() {
    return (
        <section id="tipos" className="py-24 bg-primary/30 relative">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-accent font-bold tracking-widest uppercase text-sm"
                    >
                        Conhecimento Técnico
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-heading font-bold mt-4 mb-6"
                    >
                        Tipos de <span className="text-accent">Falsificação</span>
                    </motion.h2>
                    <p className="text-foreground/60">
                        Existem diversas técnicas utilizadas para burlar a autenticidade de documentos.
                        Nossa perícia identifica cada uma delas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {types.map((type, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-lg p-8 relative overflow-hidden group hover:border-accent/40 transition-all"
                        >
                            <span className="absolute top-4 right-6 text-6xl font-heading font-bold text-accent/5 transition-colors group-hover:text-accent/10">
                                {type.number}
                            </span>
                            <h3 className="text-xl font-bold mb-4 text-accent relative z-10">
                                {type.title}
                            </h3>
                            <p className="text-foreground/60 text-sm leading-relaxed relative z-10">
                                {type.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

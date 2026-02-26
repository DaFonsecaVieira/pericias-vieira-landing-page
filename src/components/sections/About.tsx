"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Shield, Zap, Search } from "lucide-react";

const features = [
    {
        title: "Análise Científica",
        description: "Métodos rigorosos de exame grafocinético e comparativo.",
        icon: Search,
    },
    {
        title: "Segurança Jurídica",
        description: "Laudos elaborados com base nas normas técnicas vigentes.",
        icon: Shield,
    },
    {
        title: "Agilidade",
        description: "Compromisso com prazos sem abrir mão do rigor técnico.",
        icon: Zap,
    },
];

const characteristics = [
    "Ritmo e Velocidade Gráfica",
    "Pressão e Evolução do Traçado",
    "Proporções e Espaçamentos",
    "Alinhamentos e Inclinação Axial",
    "Inícios e Remates (Ataques e Escapes)",
    "Traços de Ligação e Habilidade de Punho",
];

export default function About() {
    return (
        <section id="sobre" className="py-24 bg-primary relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">
                            Especialista em Documentoscopia
                        </span>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8 leading-tight">
                            O que faz um <span className="text-accent">Perito Grafotécnico?</span>
                        </h2>
                        <p className="text-foreground/70 text-lg leading-relaxed mb-8">
                            O perito grafotécnico é o profissional especializado em identificar
                            a autoria de escritas e assinaturas. Através de exames científicos
                            complexos, analisamos diversos elementos que tornam a escrita de
                            cada indivíduo única e irreproduzível.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {features.map((feature, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center">
                                        <feature.icon className="text-accent" size={20} />
                                    </div>
                                    <h4 className="font-bold text-sm">{feature.title}</h4>
                                    <p className="text-xs text-foreground/60 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center gap-10"
                    >
                        <div className="relative w-full max-w-[320px] rounded-lg overflow-hidden shadow-2xl border-2 border-white/5 group">
                            <Image
                                src="/perito.jpg"
                                alt="Perito André Vieira"
                                width={320}
                                height={450}
                                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6 text-center">
                                <span className="text-accent font-heading font-bold text-xl drop-shadow-lg">
                                    André Vieira
                                </span>
                            </div>
                        </div>

                        <div className="glass w-full max-w-[450px] p-8 rounded-lg relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-light" />
                            <h3 className="font-heading font-bold text-xl mb-6 text-white text-center md:text-left">
                                Características Gráficas Analisadas
                            </h3>
                            <ul className="grid grid-cols-1 gap-4">
                                {characteristics.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-foreground/70">
                                        <Check className="text-accent shrink-0" size={16} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

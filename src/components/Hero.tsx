"use client";

import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-primary">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-24 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] -ml-32 -mb-16 pointer-events-none" />

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        Perito Grafotécnico Especialista
                    </div>

                    <h1 className="text-4xl md:text-6xl font-heading font-extrabold leading-[1.1] text-white">
                        Verdade e <span className="text-accent underline decoration-white/10 decoration-4 underline-offset-8">Segurança</span> em cada Assinatura
                    </h1>

                    <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl">
                        Atuação especializada na identificação de fraudes, falsificações e
                        análises gráficas complexas para suporte jurídico e preventivo.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a
                            href="https://wa.me/559281085357"
                            className="bg-accent hover:bg-accent-light text-primary font-bold py-4 px-8 rounded-sm transition-all flex items-center justify-center gap-2 group shadow-xl shadow-accent/20"
                            onClick={() => { if (typeof window !== 'undefined' && (window as any).fbq) (window as any).fbq('track', 'Contact'); }}
                        >
                            Solicitar Orçamento
                            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#servicos"
                            className="border border-white/10 hover:border-accent/50 hover:bg-white/5 text-white font-bold py-4 px-8 rounded-sm transition-all flex items-center justify-center"
                        >
                            Conheça os Serviços
                        </a>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="glass p-5 rounded-md flex items-center gap-4 max-w-fit"
                    >
                        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="text-accent animate-pulse" size={28} />
                        </div>
                        <p className="font-heading font-semibold text-white leading-tight">
                            Anos de experiência em diversos <br />
                            <span className="text-accent">casos de falsificação</span>
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative hidden lg:block"
                >
                    {/* Decorative graphic inspired by the previous one */}
                    <div className="relative w-full aspect-square flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-accent/10 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute inset-8 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                        {/* Floating elements */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 -left-4 glass p-4 rounded-lg shadow-2xl border-l-4 border-l-accent"
                        >
                            <div className="text-xs text-accent font-bold mb-1">Análise Científica</div>
                            <div className="text-[10px] opacity-70">Exame Grafocinético</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-1/4 -right-4 glass p-4 rounded-lg shadow-2xl border-r-4 border-r-accent"
                        >
                            <div className="text-xs text-accent font-bold mb-1">Amparo Jurídico</div>
                            <div className="text-[10px] opacity-70">Laudos Judiciais</div>
                        </motion.div>

                        <div className="relative z-10 w-[80%] aspect-square bg-gradient-to-tr from-accent/20 to-transparent rounded-full flex items-center justify-center p-12 ">
                            <div className="w-full h-full bg-primary/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent/20">
                                <span className="text-8xl font-heading font-bold text-accent/20">PV</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

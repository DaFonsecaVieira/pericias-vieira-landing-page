"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Instagram, Linkedin, Facebook, Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary border-t border-white/10 pt-20 pb-10 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt="Logo Perícias Vieira"
                                width={40}
                                height={40}
                            />
                            <span className="text-xl font-heading font-bold">
                                Perícias <span className="text-accent">Vieira</span>
                            </span>
                        </Link>
                        <p className="text-foreground/70 text-sm leading-relaxed max-w-sm">
                            Serviço especializado em perícia grafotécnica. Análise científica de
                            assinaturas e documentos, contribuindo para a verdade dos fatos e a
                            segurança jurídica.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">
                            Navegação
                        </h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Sobre", href: "#sobre" },
                                { name: "Serviços", href: "#servicos" },
                                { name: "Tipos de Perícia", href: "#tipos" },
                                { name: "Áreas de Atuação", href: "#atuacao" },
                                { name: "Benefícios", href: "#beneficios" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-foreground/60 hover:text-accent transition-colors text-sm"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm mb-6 uppercase tracking-wider">
                            Contato
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:contato@peritografo.com.br"
                                    className="flex items-center gap-3 text-foreground/60 hover:text-accent transition-colors text-sm"
                                >
                                    <Mail size={16} className="text-accent" />
                                    contato@peritografo.com.br
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/5592981085357"
                                    target="_blank"
                                    className="flex items-center gap-3 text-foreground/60 hover:text-accent transition-colors text-sm"
                                    onClick={() => { if (typeof window !== 'undefined' && (window as any).fbq) (window as any).fbq('track', 'Contact'); }}
                                >
                                    <Phone size={16} className="text-accent" />
                                    (92) 98108-5357
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="#contato"
                                    className="inline-block mt-2 text-accent font-bold text-sm hover:underline"
                                >
                                    Solicitar Orçamento
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-foreground/50 text-xs">
                        &copy; {currentYear} Perícias Vieira. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-4">
                        {[
                            { icon: Instagram, href: "#", label: "Instagram" },
                            { icon: Linkedin, href: "#", label: "LinkedIn" },
                            {
                                icon: Facebook,
                                href: "https://web.facebook.com/profile.php?id=61583143215939",
                                label: "Facebook",
                            },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                aria-label={social.label}
                                target="_blank"
                                className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all group"
                            >
                                <social.icon
                                    size={18}
                                    className="text-foreground/50 group-hover:text-accent"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

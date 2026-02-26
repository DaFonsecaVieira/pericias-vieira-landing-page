"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Sobre", href: "#sobre" },
    { name: "Serviços", href: "#servicos" },
    { name: "Tipos de Perícia", href: "#tipos" },
    { name: "Áreas de Atuação", href: "#atuacao" },
    { name: "Benefícios", href: "#beneficios" },
    { name: "Contato", href: "#contato" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass py-3 shadow-lg" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Logo Perícias Vieira"
                        width={45}
                        height={45}
                        className="object-contain"
                    />
                    <div className="flex flex-col">
                        <span className="text-xl font-heading font-bold leading-tight">
                            Perícias <span className="text-accent text-xl">Vieira</span>
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium hover:text-accent transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="https://wa.me/5592993458428"
                        target="_blank"
                        className="bg-accent hover:bg-accent-light text-primary font-bold py-2 px-5 rounded-sm transition-all text-sm"
                    >
                        Orçamento
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 bg-primary/95 z-40 transition-transform duration-300 md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-2xl font-heading hover:text-accent transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="https://wa.me/5592993458428"
                        target="_blank"
                        className="bg-accent hover:bg-accent-light text-primary font-bold py-3 px-8 rounded-sm transition-all text-lg"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Falar no WhatsApp
                    </Link>
                </div>
            </div>
        </header>
    );
}

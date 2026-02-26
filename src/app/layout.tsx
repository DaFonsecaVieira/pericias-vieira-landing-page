import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Perícias Vieira | Análise e Autenticação de Assinaturas e Documentos",
  description: "Serviço especializado em perícia grafotécnica: análise de assinaturas, laudos periciais e verificação de autenticidade documental.",
  keywords: ["perito grafotécnico", "perícia grafotécnica", "assinatura falsa", "laudo pericial", "André Vieira"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-body antialiased bg-primary text-foreground`}>
        {children}
      </body>
    </html>
  );
}

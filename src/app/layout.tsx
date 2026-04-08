import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Atacadão - Folhetos de Ofertas",
  description: "Acesse os melhores folhetos de ofertas do Atacadão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}

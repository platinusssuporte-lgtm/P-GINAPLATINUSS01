import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Platinuss Design | Sites profissionais que vendem por você",
  description:
    "A Platinuss Design cria sites profissionais que transformam visitantes em clientes. Pare de perder vendas todo dia por não ter presença online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="antialiased">
      <body>{children}</body>
    </html>
  );
}

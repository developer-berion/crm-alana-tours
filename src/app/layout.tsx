import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alana Tours – Sistema de Clientes",
  description: "Sistema interno de gestión para Alana Tours",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

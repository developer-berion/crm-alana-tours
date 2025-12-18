import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM Lite – Agencias de Viajes",
  description: "Sistema interno de gestión para Alana Tours",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

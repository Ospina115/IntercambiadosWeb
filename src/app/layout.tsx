import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppProviders from "@/app/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INTERCAMBIADOS | Moda que vuelve a circular",
  description:
    "Descubre prendas, bolsos, gafas y accesorios. Compra, vende o intercambia lo que ya no necesitas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

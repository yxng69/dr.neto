import type { Metadata } from "next";
import SceneWrapper from "../components/SceneWrapper";
import { JetBrains_Mono } from 'next/font/google';
import CustomCursor from "../components/CustomCursor";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: "Digital Threads | Cyber-Brutalist Apparel",
  description: "Digital-First Streetwear E-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable}`}>
      <body className="bg-black text-white antialiased min-h-screen selection:bg-[#ccff00] selection:text-black font-mono cursor-none">
        <CustomCursor />
        {/* Capa 3D al fondo */}
        <SceneWrapper />
        
        {/* Capa UI superpuesta */}
        <main className="relative z-10 min-h-screen border-x border-white/10 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}

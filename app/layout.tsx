import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components";
import { ThemeProvider } from "@/contexts";

export const metadata: Metadata = {
  title: "Tailwind Gallery",
  description: "A gallery of Tailwind CSS components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bkg transition-colors duration-75">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ProgressProviderWrapper } from "@/components/ProgressProviderWrapper";

export const metadata: Metadata = {
  title: "RAG Playground - Master RAG Architectures Through Play",
  description: "Interactive visualizations of 8 AI retrieval patterns. No coding required. No setup. Just pure learning.",
  keywords: ["RAG", "Retrieval Augmented Generation", "AI", "Machine Learning", "Vector Search", "LLM"],
  authors: [{ name: "RAG Playground" }],
  openGraph: {
    title: "RAG Playground - Master RAG Architectures Through Play",
    description: "Interactive visualizations of 8 AI retrieval patterns",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background">
        <ProgressProviderWrapper>
          {children}
        </ProgressProviderWrapper>
      </body>
    </html>
  );
}


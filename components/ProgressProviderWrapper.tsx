"use client";

import { ProgressProvider } from "@/lib/progressContext";

export function ProgressProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}


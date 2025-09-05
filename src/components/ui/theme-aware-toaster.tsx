"use client";

import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "next-themes";

export function ThemeAwareToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      richColors
      theme={theme as "light" | "dark" | "system"}
      position="top-right"
    />
  );
}
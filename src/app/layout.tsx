import "@/styles/globals.css";
import { cn, generateMetadata } from "@/functions";
import { inter, satoshi } from "@/constants";
import { ThemeAwareToaster } from "@/components/ui/theme-aware-toaster";
import { LightModeOrbs } from "@/components/ui/light-mode-orbs";
import { Providers } from "@/components";

export const metadata = generateMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground antialiased font-default overflow-x-hidden !scrollbar-hide",
                    inter.variable,
                    satoshi.variable,
                )}
            >
                <ThemeAwareToaster />
                <Providers>
                    <LightModeOrbs />
                    {children}
                </Providers>
            </body>
        </html>
    );
};

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
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                    var systemTheme = systemIsDark ? 'dark' : 'light';
                                    var stored = '';
                                    try { stored = localStorage.getItem('theme') || ''; } catch(_) {}
                                    var theme = (stored === 'light' || stored === 'dark') ? stored : systemTheme;
                                    document.documentElement.classList.remove('light', 'dark');
                                    document.documentElement.classList.add(theme);
                                    document.documentElement.style.colorScheme = theme;
                                    document.documentElement.setAttribute('data-theme', theme);
                                } catch (e) {
                                    document.documentElement.classList.add('light');
                                    document.documentElement.style.colorScheme = 'light';
                                }
                            })();
                        `,
                    }}
                />
            </head>
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

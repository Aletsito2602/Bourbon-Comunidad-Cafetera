"use client";

import React from "react"
import { ThemeProvider } from "next-themes"
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
    children: React.ReactNode;
}

// const client = new QueryClient();

const Providers = ({ children }: Props) => {
    return (
        // <QueryClientProvider client={client}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        // </QueryClientProvider> 
    );
};

export default Providers
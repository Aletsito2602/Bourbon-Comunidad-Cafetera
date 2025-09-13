"use client";

import React from 'react';
import { Navbar, Footer } from "@/components";

interface Props {
    children: React.ReactNode
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <>
            {/* Sección hero completa con video de fondo */}
            <div className="absolute inset-x-0 top-0 h-screen -z-10 pointer-events-none">
                {/* Marco exterior grande que abarca toda la sección hero */}
                <div className="relative w-full h-full bg-white dark:bg-neutral-900">
                    {/* Video con marco interno */}
                    <div className="absolute inset-4 md:inset-8 lg:inset-12">
                        <div className="relative w-full h-full border-[10px] rounded-[50px] overflow-hidden border-neutral-600/80 dark:border-neutral-600/80 light:border-teal-300/60 light:shadow-[0_0_0_2px_rgba(20,184,166,0.1)] bg-white dark:bg-neutral-900">
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster="/images/dashboardb.png"
                                onLoadedMetadata={(e) => {
                                    const video = e.currentTarget;
                                    video.addEventListener('timeupdate', () => {
                                        if (video.currentTime >= 10) {
                                            video.currentTime = 0;
                                        }
                                    });
                                }}
                            >
                                <source src="https://zsucsanecavdmpnpatct.supabase.co/storage/v1/object/public/landing/videoplayback.mp4" type="video/mp4" />
                            </video>
                            {/* Overlay sutil para legibilidad del texto */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent dark:from-black/30 dark:via-black/20 dark:to-black/40" />
                        </div>
                    </div>
                </div>
                {/* Desvanecido inferior para transición suave - FUERA del contenedor del video */}
                <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-b from-transparent to-background" />
            </div>
            <Navbar />
            <main className="mx-auto w-full z-40 relative">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default MarketingLayout

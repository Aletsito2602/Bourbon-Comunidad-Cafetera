"use client";

import Container from "../global/container";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

const Rewards = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full relative">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Contenido de texto */}
                    <div className="flex flex-col space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold !leading-tight">
                            {t('rewards.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-lg">
                            {t('rewards.subtitle')}
                        </p>
                    </div>
                    
                    {/* Imagen */}
                    <div className="flex justify-center lg:justify-end relative">
                        <div className="relative">
                            <Image
                                src="/images/afiadecard.png"
                                alt="Programa de recompensas"
                                width={500}
                                height={400}
                                className="w-full max-w-md h-auto object-contain"
                            />
                            {/* Efecto de desvanecimiento hacia abajo */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
};

export default Rewards

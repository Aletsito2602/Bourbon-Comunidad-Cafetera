"use client";

import Link from "next/link";
import Container from "../global/container";
import { Button } from "../ui/button";
import Plasma from "../ui/plasma";
import { useTranslation } from "@/hooks/useTranslation";

const CTA = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full relative">
            <Container>
                <div className="flex flex-col items-center justify-center text-center w-full px-4 md:px-0 mx-auto h-[500px] border border-foreground/10 rounded-3xl overflow-hidden relative isolation-isolate">
                    {/* Plasma background */}
                    <Plasma
                        color="#00ffd5"
                        speed={0.6}
                        direction="forward"
                        scale={1.1}
                        opacity={0.9}
                        mouseInteractive={true}
                    />
                    <div className="flex flex-col items-center justify-center w-full z-20 relative">
                        <h2 className="text-4xl md:text-6xl font-heading heading font-semibold !leading-tight mt-6 text-white">
                            Eleva tu <br className="hidden md:block" /> experiencia con nosotros
                        </h2>
                        <p className="text-base md:text-lg text-center font-normal max-w-xl mx-auto mt-6 text-cyan-400 drop-shadow-2xl">
                            {t('cta.subtitle')}
                        </p>
                        <div className="flex items-center justify-center w-full gap-6 mt-6">
                            <Button asChild size="lg" className="w-full md:w-max">
                                <Link href="https://app.soybourbon.com">
                                    {t('cta.primary')}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
};

export default CTA

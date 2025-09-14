import Link from "next/link";
import Container from "../global/container";
import { Button } from "../ui/button";
import Prism from "../ui/prism";

const CTA = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full relative">
            <Container>
                <div className="flex flex-col items-center justify-center text-center w-full px-4 md:px-0 mx-auto h-[500px] border border-foreground/10 rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0 -z-10">
                        <Prism
                            animationType="rotate"
                            timeScale={0.3}
                            height={3.5}
                            baseWidth={5.5}
                            scale={2.8}
                            hueShift={0.8}
                            colorFrequency={1.2}
                            noise={0.3}
                            glow={1.5}
                            bloom={1.2}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full z-20 relative">
                        <h2 className="text-4xl md:text-6xl font-heading heading font-semibold !leading-tight mt-6 text-white">
                            Eleva tu <br className="hidden md:block" /> experiencia con nosotros
                        </h2>
                        <p className="text-base md:text-lg text-center text-white/90 max-w-xl mx-auto mt-6">
                            ¿Listo para comenzar? Regístrate ahora y comienza tu viaje con nosotros. Estamos aquí para ayudarte a crecer.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-6 mt-6">
                            <Button asChild size="lg" className="w-full md:w-max bg-white text-black hover:bg-white/90">
                                <Link href="/app">
                                    Comenzar
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="w-full md:w-max border-white/30 text-white hover:bg-white/10">
                                <Link href="/pricing">
                                    Saber Más
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

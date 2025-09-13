"use client";

import Container from "../global/container";
import { AnimatedCoffeeWaste, AnimatedQuality, AnimatedCustomers, AnimatedMenu, AnimatedCosts } from "@/components/ui/animated-icons";
import { GridMotionBackground, ParticleBackground, DotGridBackground } from "@/components/ui/animated-backgrounds";
import MagicCard from "../ui/magic-card";
import { SectionBadge } from "../ui/section-bade";
import { motion } from "framer-motion";

const Features = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full relative" key="features-redesign-v2">
            <DotGridBackground className="-z-10" />
            <Container>
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    <SectionBadge title="Características" />
                    <motion.h2 
                        className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold !leading-tight mt-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Optimiza tu cafetería <br /> con inteligencia artificial
                    </motion.h2>
                    <motion.p 
                        className="text-lg md:text-xl text-center text-muted-foreground mt-8 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Reduce desperdicios, mejora la calidad, aumenta el reconsumo y perfecciona tu carta con herramientas diseñadas específicamente para cafeterías modernas.
                    </motion.p>
                </div>
            </Container>
            <div className="mt-20 w-full">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                        {/* Reduce desperdicios */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <MagicCard particles={true} className="group h-full bg-white/90 dark:bg-primary/[0.12] border border-border/60 dark:border-primary/20 hover:border-primary/30 transition-all duration-300">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                                        <AnimatedCoffeeWaste className="w-full h-full" />
                                        <GridMotionBackground className="-z-10 opacity-30" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                                                Reduce desperdicios
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Controla el stock en tiempo real y minimiza las mermas con alertas inteligentes.
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center text-primary text-sm font-medium">
                                            Ahorra hasta 30% en costos
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </MagicCard>
                        </motion.div>

                        {/* Mejora la calidad */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <MagicCard particles={true} className="group h-full bg-white/90 dark:bg-primary/[0.12] border border-border/60 dark:border-primary/20 hover:border-primary/30 transition-all duration-300">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                                        <AnimatedQuality className="w-full h-full" />
                                        <ParticleBackground className="-z-10 opacity-40" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                                                Mejora la calidad
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Estandariza recetas y procesos para garantizar sabor consistente en cada bebida.
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center text-primary text-sm font-medium">
                                            Calidad constante 100%
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </MagicCard>
                        </motion.div>

                        {/* Aumenta el reconsumo */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                        >
                            <MagicCard particles={true} className="group h-full bg-white/90 dark:bg-primary/[0.12] border border-border/60 dark:border-primary/20 hover:border-primary/30 transition-all duration-300">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                                        <AnimatedCustomers className="w-full h-full" />
                                        <GridMotionBackground className="-z-10 opacity-25" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                                                Aumenta reconsumo
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Fideliza clientes con programas de lealtad y recomendaciones personalizadas.
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center text-primary text-sm font-medium">
                                            +40% clientes recurrentes
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </MagicCard>
                        </motion.div>

                        {/* Control de costos */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                        >
                            <MagicCard particles={true} className="group h-full bg-white/90 dark:bg-primary/[0.12] border border-border/60 dark:border-primary/20 hover:border-primary/30 transition-all duration-300">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                                        <AnimatedCosts className="w-full h-full" />
                                        <ParticleBackground className="-z-10 opacity-35" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                                                Control de costos
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Calcula automáticamente costos reales y optimiza precios para máxima rentabilidad.
                                            </p>
                                        </div>
                                        <div className="mt-6 flex items-center text-primary text-sm font-medium">
                                            Rentabilidad optimizada
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </MagicCard>
                        </motion.div>
                    </div>
                </Container>

                {/* Sección adicional con carta digital */}
                <Container>
                    <motion.div
                        className="mt-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                    >
                        <MagicCard particles={true} className="group bg-gradient-to-r from-white/95 to-white/90 dark:from-primary/[0.15] dark:to-primary/[0.08] border border-border/60 dark:border-primary/20 hover:border-primary/30 transition-all duration-300">
                            <div className="p-12 lg:p-16">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <h3 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6 group-hover:text-primary transition-colors">
                                            Optimiza tu carta digital
                                        </h3>
                                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                            Crea menús atractivos con fotos profesionales, descripciones optimizadas y precios estratégicos que aumenten las ventas de cada producto.
                                        </p>
                                        <div className="space-y-4">
                                            <div className="flex items-center text-foreground">
                                                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                                <span className="text-sm font-medium">Fotos profesionales automatizadas</span>
                                            </div>
                                            <div className="flex items-center text-foreground">
                                                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                                <span className="text-sm font-medium">Descripciones que venden más</span>
                                            </div>
                                            <div className="flex items-center text-foreground">
                                                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                                <span className="text-sm font-medium">Precios optimizados por IA</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div className="relative w-full h-80 rounded-2xl overflow-hidden">
                                            <AnimatedMenu className="w-full h-full" />
                                            <GridMotionBackground className="-z-10 opacity-20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MagicCard>
                    </motion.div>
                </Container>
            </div>
        </div>
    )
};

export default Features

"use client";

import Container from "../global/container";
import { AnimatedCoffeeWaste, AnimatedQuality, AnimatedCustomers, AnimatedCosts } from "@/components/ui/animated-icons";
import MagicCard from "../ui/magic-card";
import { SectionBadge } from "../ui/section-bade";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const Features = () => {
    const { t } = useTranslation();
    return (
        <div id="features" className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full relative" key="features-simplified">
            <Container>
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    <SectionBadge title={t('perks.badge')} />
                    <motion.h2 
                        className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold !leading-tight mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {t('features.title')}
                    </motion.h2>
                    <motion.p 
                        className="text-lg md:text-xl text-center text-muted-foreground mt-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {t('features.subtitle')}
                    </motion.p>
                </div>
            </Container>
            <div className="mt-16 w-full">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
                        {/* Operación */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <MagicCard particles={true} className="group h-full bg-white/90 dark:bg-primary/[0.10] border border-border/60 dark:border-primary/20 hover:border-primary/30 transition-all duration-300">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="relative w-full h-40 mb-6 rounded-xl overflow-hidden">
                                        <AnimatedCoffeeWaste className="w-full h-full" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {t('features.cards.operation.title')}
                                            </h3>
                                            <p className="text-base text-muted-foreground leading-relaxed">
                                                {t('features.cards.operation.desc')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </MagicCard>
                        </motion.div>

                        {/* Producto */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <MagicCard particles={true} className="group h-full bg-white/90 dark:bg-primary/[0.10] border border-border/60 dark:border-primary/20 hover:border-primary/30 transition-all duration-300">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="relative w-full h-40 mb-6 rounded-xl overflow-hidden">
                                        <AnimatedQuality className="w-full h-full" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {t('features.cards.product.title')}
                                            </h3>
                                            <p className="text-base text-muted-foreground leading-relaxed">
                                                {t('features.cards.product.desc')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </MagicCard>
                        </motion.div>

                        {/* Abastecimiento */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <MagicCard particles={true} className="group h-full bg-white/90 dark:bg-primary/[0.10] border border-border/60 dark:border-primary/20 hover:border-primary/30 transition-all duration-300">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="relative w-full h-40 mb-6 rounded-xl overflow-hidden">
                                        <AnimatedCustomers className="w-full h-full" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {t('features.cards.supply.title')}
                                            </h3>
                                            <p className="text-base text-muted-foreground leading-relaxed">
                                                {t('features.cards.supply.desc')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </MagicCard>
                        </motion.div>

                        {/* Negocio */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <MagicCard particles={true} className="group h-full bg-white/90 dark:bg-primary/[0.10] border border-border/60 dark:border-primary/20 hover:border-primary/30 transition-all duration-300">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="relative w-full h-40 mb-6 rounded-xl overflow-hidden">
                                        <AnimatedCosts className="w-full h-full" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {t('features.cards.business.title')}
                                            </h3>
                                            <p className="text-base text-muted-foreground leading-relaxed">
                                                {t('features.cards.business.desc')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </MagicCard>
                        </motion.div>
                    </div>
                </Container>
            </div>
        </div>
    )
};

export default Features

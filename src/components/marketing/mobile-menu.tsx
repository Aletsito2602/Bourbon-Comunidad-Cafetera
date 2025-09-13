"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/functions";
import { useClickOutside } from "@/hooks";
import { motion } from "framer-motion";
import { Box, CalendarClock, Captions, CircleHelp, CopyCheck, FileText, Gem, Layers3, LineChart, Newspaper, UserCog, Waypoints } from "lucide-react";
import Link from "next/link";
import React from 'react';
import { useTheme } from "next-themes";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu = ({ isOpen, setIsOpen }: Props) => {

    const ref = useClickOutside(() => setIsOpen(false));
    const { theme } = useTheme();

    const variants = {
        open: { opacity: 1, y: 20 },
        closed: { opacity: 0, y: 0 },
    };

    return (
        <div
            ref={ref}
            className={cn(
                "absolute top-12 inset-x-0 size-full p-4 z-20 bg-inherit flex flex-1",
                isOpen ? "flex" : "hidden"
            )}
        >
            <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                transition={{
                    type: "spring",
                    bounce: 0.15,
                    duration: 0.5,
                }}
                className="size-full flex flex-col justify-start"
            >
                <ul className="flex flex-col items-start flex-1 w-full space-y-3">
                    <li
                        onClick={() => setIsOpen(false)}
                        className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <Link href="/how-it-works" className="flex items-center w-full text-start">
                            <UserCog className="w-4 h-4 mr-2" />
                            Cómo funciona
                        </Link>
                    </li>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-transparent">
                            <AccordionTrigger className="px-4 py-2 text-lg hover:text-muted-foreground font-normal">
                                <span className="flex items-center">
                                    <CopyCheck className="w-4 h-4 mr-2" />
                                    Características
                                </span>
                            </AccordionTrigger>
                            <AccordionContent onClick={() => setIsOpen(false)} className="flex flex-col items-start gap-1 mt-1">
                                <li
                                    className="w-full px-4 py-2 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                                >
                                    <Link href="/" className="flex items-center w-full text-start">
                                        <Captions className="w-4 h-4 mr-2" />
                                        Generación de descripciones
                                    </Link>
                                </li>
                                <li
                                    className="w-full px-4 py-2 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                                >
                                    <Link href="/" className="flex items-center w-full text-start">
                                        <CalendarClock className="w-4 h-4 mr-2" />
                                        Programación de publicaciones
                                    </Link>
                                </li>
                                <li
                                    className="w-full px-4 py-2 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                                >
                                    <Link href="/" className="flex items-center w-full text-start">
                                        <LineChart className="w-4 h-4 mr-2" />
                                        Panel de analíticas
                                    </Link>
                                </li>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <li
                        onClick={() => setIsOpen(false)}
                        className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <Link href="/" className="flex items-center w-full text-start">
                            <Gem className="w-4 h-4 mr-2" />
                            Precios
                        </Link>
                    </li>
                    <li
                        onClick={() => setIsOpen(false)}
                        className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                    >
                        <Link href="/" className="flex items-center w-full text-start">
                            <Waypoints className="w-4 h-4 mr-2" />
                            Integraciones
                        </Link>
                    </li>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-transparent">
                            <AccordionTrigger className="px-4 py-2 text-lg hover:text-muted-foreground font-normal">
                                <span className="flex items-center">
                                    <Layers3 className="w-4 h-4 mr-2" />
                                    Recursos
                                </span>
                            </AccordionTrigger>
                            <AccordionContent onClick={() => setIsOpen(false)} className="flex flex-col items-start gap-1 mt-1">
                                <li className="w-full px-4 py-2 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80">
                                    <Link href="/resources/affiliates" className="flex items-center w-full text-start">
                                        <Newspaper className="w-4 h-4 mr-2" />
                                        Sistema de afiliados
                                    </Link>
                                </li>
                                <li className="w-full px-4 py-2 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80">
                                    <Link href="/community" className="flex items-center w-full text-start">
                                        <CircleHelp className="w-4 h-4 mr-2" />
                                        Comunidad
                                    </Link>
                                </li>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    {/* Auth actions */}
                    <li className="w-full px-4 pt-2">
                        <Link
                            href="https://app.soybourbon.com"
                            className={cn(
                                "inline-flex items-center justify-center w-full h-11 rounded-md border text-base transition",
                                theme === "light" ? "bg-teal-500 text-white border-teal-500 hover:bg-teal-600" : "bg-muted/20 text-foreground border-border hover:bg-muted/30"
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            Iniciar sesión
                        </Link>
                    </li>
                    <li className="w-full px-4 pb-2">
                        <Link
                            href="https://app.soybourbon.com/register"
                            className={cn(
                                "inline-flex items-center justify-center w-full h-11 rounded-md border text-base transition",
                                theme === "light" ? "bg-teal-500 text-white border-teal-500 hover:bg-teal-600" : "bg-muted/20 text-foreground border-border hover:bg-muted/30"
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            Unirte
                        </Link>
                    </li>
                </ul>
            </motion.div>
        </div>
    )
};

export default MobileMenu

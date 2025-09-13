"use client";

import { cn } from "@/functions";
import { ArrowRightIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslation } from "@/hooks/useTranslation";
import Icons from "../global/icons";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";

const Navbar = () => {

    const user = null; // Mock user for development

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { theme } = useTheme();
    const { language, changeLanguage, t, isLoaded } = useTranslation();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);


    return (
        <div className="relative w-full h-full">
            <div className="z-[99] fixed pointer-events-none inset-x-0 h-[88px] backdrop-blur-sm [mask:linear-gradient(to_bottom,#000_20%,transparent_calc(100%-20%))] dark:bg-[rgba(10,10,10,0.8)] bg-white/85"></div>

            <header
                className={cn(
                    "fixed top-4 inset-x-0 mx-auto max-w-6xl px-2 md:px-12 z-[100] transform th",
                    isOpen ? "h-[calc(100%-24px)]" : "h-12"
                )}
            >
                <Wrapper className="backdrop-blur-lg rounded-xl lg:rounded-2xl border border-[rgba(124,124,124,0.2)] px- md:px-2 flex items-center justify-start bg-white/80 dark:bg-transparent shadow-lg dark:shadow-none">
                    <div className="flex items-center justify-between w-full sticky mt-[7px] lg:mt-auto mb-auto inset-x-0">
                        <div className="flex items-center flex-1 lg:flex-none pl-1">
                            <Link href="/" className="text-lg font-semibold text-foreground">
                                <Image
                                    src={theme === "light" ? "/nb/bourbon favicon.png" : "/nb/bourbon icon.png"}
                                    alt="Bourbon"
                                    width={24}
                                    height={24}
                                    className="h-5 w-auto"
                                    priority
                                />
                            </Link>
                            <div className="items-center hidden ml-4 lg:flex">
                                <Menu lang={language} />
                            </div>
                        </div>
                        <div className="items-center flex gap-2 lg:gap-4">
                            {user ? (
                                <Button size="sm" variant="white" asChild className="hidden sm:flex">
                                    <Link href="/app">
                                        Panel
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        size="sm"
                                        variant="tertiary"
                                        asChild
                                        className={cn(
                                            "hover:translate-y-0 hover:scale-100",
                                            theme === "light" && "bg-teal-500 text-white hover:bg-teal-600 border-teal-500"
                                        )}
                                    >
                                        <Link href="https://app.soybourbon.com">
                                            {isLoaded ? t('navbar.signIn') : 'Iniciar sesión'}
                                        </Link>
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="white"
                                        asChild
                                        className={cn(
                                            "hidden sm:flex",
                                            theme === "light" && "bg-teal-500 text-white hover:bg-teal-600 border-teal-500"
                                        )}
                                    >
                                        <Link href="https://app.soybourbon.com/register">
                                            {isLoaded ? t('navbar.startFree') : 'Comenzar gratis'}
                                            <ArrowRightIcon className="w-4 h-4 ml-2 hidden lg:block" />
                                        </Link>
                                    </Button>
                                </>
                            )}
                            {/* Language Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost" className="w-9 h-9">
                                        <span className="text-lg" aria-label="Idioma">
                                            {language === "es-AR" ? "🇦🇷" : language === "en-US" ? "🇺🇸" : "🇧🇷"}
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => changeLanguage("es-AR")}>
                                        🇦🇷 Español
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage("en-US")}>
                                        🇺🇸 English
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => changeLanguage("pt-BR")}>
                                        🇧🇷 Português
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <ThemeToggle />
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setIsOpen((prev) => !prev)}
                                className="lg:hidden p-2 w-8 h-8"
                            >
                                {isOpen ? <XIcon className="w-4 h-4 duration-300" /> : <Icons.menu className="w-3.5 h-3.5 duration-300" />}
                            </Button>
                        </div>
                    </div>
                    <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
                </Wrapper>
            </header>

        </div>
    )
};

export default Navbar

"use client";

import Marquee from "../ui/marquee";
import { useTranslation } from "@/hooks/useTranslation";

const Companies = () => {
    const coffeeShops = [
        { name: "Aste Coffee", src: "/cafeterias/aste_white_hd.png" },
        { name: "Godere Coffee", src: "/cafeterias/godere_white_hd.png" },
        { name: "Kaapeh Coffee", src: "/cafeterias/kaapeh_white_hd.png" },
        { name: "Kaizen Coffee", src: "/cafeterias/kaizen_white_hd.png" },
    ];

    const { t } = useTranslation();

    return (
        <div className="flex w-full py-20">
            <div className="flex flex-col items-center justify-center text-center w-full py-2">
                <h2 className="text-xl heading">{t('companies.title')}</h2>
                <div className="mt-16 w-full relative overflow-hidden">
                    <Marquee pauseOnHover className="[--duration:20s]">
                        <div className="flex gap-12 md:gap-16 items-center">
                            {coffeeShops.map((shop, index) => (
                                <div key={`${shop.name}-${index}`} className="flex items-center justify-center">
                                    <img
                                        src={shop.src}
                                        alt={shop.name}
                                        className="h-8 w-auto object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
                                    />
                                </div>
                            ))}
                            {/* Duplicate for seamless loop */}
                            {coffeeShops.map((shop, index) => (
                                <div key={`${shop.name}-duplicate-${index}`} className="flex items-center justify-center">
                                    <img
                                        src={shop.src}
                                        alt={shop.name}
                                        className="h-8 w-auto object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </Marquee>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
                </div>
            </div>
        </div>
    )
};

export default Companies

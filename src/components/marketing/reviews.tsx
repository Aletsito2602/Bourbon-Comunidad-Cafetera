"use client";

import { REVIEWS } from "@/constants";
import Container from "../global/container";
import Marquee from "../ui/marquee";
import { SectionBadge } from "../ui/section-bade";
import { FloatingDotsBackground } from "../ui/animated-backgrounds";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

const firstRow = REVIEWS.slice(0, REVIEWS.length / 2);
const secondRow = REVIEWS.slice(REVIEWS.length / 2);

const Reviews = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24  w-full">
            <Container>
                <div className="flex flex-col items-center text-center max-w-xl mx-auto">
                    <SectionBadge title={t('reviews.badge')} />
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
                        {t('reviews.title')}
                    </h2>
                    <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
                        {t('reviews.subtitle')}
                    </p>
                </div>
            </Container>
            <Container>
                <div className="mt-16 w-full relative overflow-hidden">
                    <div className="relative flex flex-col items-center justify-center overflow-hidden">
                        <Marquee pauseOnHover className="[--duration:30s]">
                            {firstRow.map((review) => (
                                <ReviewCard key={review.username} {...review} />
                            ))}
                        </Marquee>
                        <Marquee pauseOnHover reverse className="[--duration:30s]">
                            {secondRow.map((review) => (
                                <ReviewCard key={review.username} {...review} />
                            ))}
                        </Marquee>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
                        <FloatingDotsBackground className="-z-10" />
                    </div>
                </div>
            </Container>
        </div>
    )
};

const ReviewCard = ({
    img,
    name,
    username,
    review,
}: {
    img: string;
    name: string;
    username: string;
    review: string;
}) => {
    return (
        <figure className="relative w-64 cursor-pointer overflow-hidden rounded-xl border border-foreground/10 bg-background/80 backdrop-blur-sm hover:bg-foreground/5 p-4 transition-all duration-300 ease-in-out shadow-sm">
            <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium text-foreground">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-foreground/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{review}</blockquote>
        </figure>
    );
};

export default Reviews

import localFont from "next/font/local";

export const inter = localFont({
    src: [
        {
            path: "../../public/fonts/Switzer-Light.woff2",
            weight: "300",
        },
        {
            path: "../../public/fonts/Switzer-Regular.woff2",
            weight: "400",
        },
        {
            path: "../../public/fonts/Switzer-Medium.woff2",
            weight: "500",
        },
        {
            path: "../../public/fonts/Switzer-Semibold.woff2",
            weight: "600",
        },
        {
            path: "../../public/fonts/Switzer-Bold.woff2",
            weight: "700",
        },
        {
            path: "../../public/fonts/Switzer-Extrabold.woff2",
            weight: "800",
        },
        {
            path: "../../public/fonts/Switzer-Black.woff2",
            weight: "900",
        },
    ],
    variable: "--font-inter",
});

export const satoshi = localFont({
    src: [
        {
            path: "../../public/fonts/Satoshi-Light.woff2",
            weight: "300",
        },
        {
            path: "../../public/fonts/Satoshi-Regular.woff2",
            weight: "400",
        },
        {
            path: "../../public/fonts/Satoshi-Medium.woff2",
            weight: "500",
        },
        {
            path: "../../public/fonts/Satoshi-Bold.woff2",
            weight: "700",
        },
        {
            path: "../../public/fonts/Satoshi-Black.woff2",
            weight: "900",
        },
    ],
    variable: "--font-satoshi",
});

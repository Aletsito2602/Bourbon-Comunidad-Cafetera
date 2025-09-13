import { Metadata } from "next";

interface MetadataProps {
    title?: string;
    description?: string;
    image?: string | null;
    icons?: Metadata["icons"];
    noIndex?: boolean;
    keywords?: string[];
    author?: string;
    twitterHandle?: string;
    type?: "website" | "article" | "profile";
    locale?: string;
    alternates?: Record<string, string>;
    publishedTime?: string;
    modifiedTime?: string;
}

export const generateMetadata = ({
    title = `Bourbon - Comunidad Cafetera`,
    description = "CRM para cafeterías de especialidad: control de stock e insumos, recetas estandarizadas, costos y precios, calidad del producto, fidelización de clientes, carta y sitio web, con analíticas e IA.",
    image = "/images/dashboardb.png",
    icons = [
        {
            rel: "icon",
            type: "image/png",
            url: "/nb/bourbon favicon.png"
        },
    ],
    noIndex = false,
    keywords = [
        "CRM cafeterías",
        "control de stock cafetería",
        "recetas estandarizadas café",
        "costos y precios cafetería",
        "calidad del café",
        "fidelización clientes cafetería",
        "carta digital",
        "sitio web cafetería",
        "analíticas con IA",
        "cafetería de especialidad"
    ],
    author = process.env.NEXT_PUBLIC_AUTHOR_NAME,
    twitterHandle = "@yourtwitterhandle",
    type = "website",
    locale = "en_US",
    alternates = {},
    publishedTime,
    modifiedTime
}: MetadataProps = {}): Metadata => {
    const metadataBase = new URL(process.env.NEXT_PUBLIC_APP_URL || "https://example.com");
    const imageUrl = image ? new URL(image, metadataBase).toString() : null;

    return {
        metadataBase,
        title: {
            template: `%s | Bourbon`,
            default: title
        },
        description,
        keywords,
        authors: [{ name: author }],
        creator: author,
        publisher: "Bourbon",
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        icons,

        // OpenGraph
        openGraph: {
            type,
            siteName: "Bourbon",
            title,
            description,
            ...(imageUrl && {
                images: [{
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title
                }]
            }),
            locale,
            alternateLocale: Object.keys(alternates),
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime })
        },

        // Twitter
        twitter: {
            card: imageUrl ? "summary_large_image" : "summary",
            site: twitterHandle,
            creator: twitterHandle,
            title,
            description,
            ...(imageUrl && { images: [imageUrl] })
        },

        // Robots
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        // Verification
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
            yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
            yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
        },
    };
};
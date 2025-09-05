type PLAN = {
    id: string;
    title: string;
    desc: string;
    monthlyPrice: number;
    yearlyPrice: number;
    badge?: string;
    buttonText: string;
    features: string[];
    link: string;
};

export const PLANS: PLAN[] = [
    {
        id: "free",
        title: "Gratuito",
        desc: "Comienza con herramientas esenciales para la creación de contenido en redes sociales",
        monthlyPrice: 0,
        yearlyPrice: 0,
        buttonText: "Comenzar",
        features: [
            "Generación básica de contenido con IA",
            "4 integraciones de redes sociales",
            "Soporte de la comunidad",
            "Límite de 1 proyecto",
            "Analíticas estándar",
            "Generación básica de imágenes"
        ],
        link: "https://stripe.com/free-plan-link"
    },
    {
        id: "pro",
        title: "Pro",
        desc: "Desbloquea características avanzadas para contenido y estrategia mejorados",
        monthlyPrice: 10,
        yearlyPrice: 120,
        badge: "Más Popular",
        buttonText: "Actualizar a Pro",
        features: [
            "Generación avanzada de contenido con IA",
            "10 integraciones de redes sociales",
            "Soporte por email prioritario",
            "Límite de 10 proyectos",
            "Analíticas e insights mejorados",
            "Generación de imágenes modelo Pro",
            "Herramientas de colaboración en equipo",
            "Opciones de marca personalizadas"
        ],
        link: "https://stripe.com/pro-plan-link"
    },
    {
        id: "enterprise",
        title: "Empresarial",
        desc: "Soluciones personalizadas para grandes organizaciones y agencias",
        monthlyPrice: 15,
        yearlyPrice: 180,
        badge: "Contactar Ventas",
        buttonText: "Actualizar a Empresarial",
        features: [
            "Generación ilimitada de contenido con IA",
            "Todas las integraciones de redes sociales",
            "Gerente de cuenta dedicado",
            "Proyectos ilimitados",
            "Analíticas e informes personalizados",
            "Seguridad de nivel empresarial",
            "Actualizaciones gratuitas",
            // "24/7 priority support"
        ],
        link: "https://stripe.com/enterprise-plan-link"
    }
];

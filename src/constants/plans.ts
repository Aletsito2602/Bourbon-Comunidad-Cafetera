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
    id: "starter",
    title: "Barista",
    desc: "Lo esencial para comenzar: carta online y control básico.",
    monthlyPrice: 29,
    yearlyPrice: 29 * 12,
    buttonText: "Elegir Barista",
    features: [
      "Carta online con QR",
      "Control básico de stock",
      "Comandas simples (barra/salón)",
      "1 local / 3 usuarios",
      "Reportes básicos"
    ],
    link: "#plan-barista"
  },
  {
    id: "pro",
    title: "Especialidad",
    desc: "Escala tu operación con recetas y analíticas.",
    monthlyPrice: 49,
    yearlyPrice: 49 * 12,
    badge: "Más Popular",
    buttonText: "Elegir Especialidad",
    features: [
      "Recetas estandarizadas",
      "Costos y pricing sugerido",
      "Stock por lotes y alertas",
      "Fidelización (puntos y cupones)",
      "2 locales / 6 usuarios",
      "Analíticas con IA"
    ],
    link: "#plan-especialidad"
  },
  {
    id: "plus",
    title: "Tostador",
    desc: "Operación multi-canal y automatizaciones.",
    monthlyPrice: 99,
    yearlyPrice: 99 * 12,
    buttonText: "Elegir Tostador",
    features: [
      "Pedidos omnicanal (salón, barra, take-away)",
      "Listas de precios por canal y horario",
      "Agente IA de atención 24/7",
      "Sistema de afiliados propio",
      "Integraciones (impresoras, WhatsApp, etc.)",
      "5 locales / 12 usuarios",
      "Dashboards avanzados"
    ],
    link: "#plan-tostador"
  },
  {
    id: "enterprise",
    title: "Reserva",
    desc: "Implementación a medida para cadenas.",
    monthlyPrice: 199,
    yearlyPrice: 199 * 12,
    buttonText: "Contactar Ventas",
    features: [
      "Locales y usuarios ilimitados",
      "Onboarding y éxito dedicado",
      "SSO y seguridad avanzada",
      "Workflows y reportes a medida",
      "Integraciones personalizadas"
    ],
    link: "#plan-reserva"
  }
];

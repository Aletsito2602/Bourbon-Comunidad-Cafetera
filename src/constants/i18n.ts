export type Language = "es-AR" | "en-US" | "pt-BR";

export const translations = {
  "es-AR": {
    // Navbar
    navbar: {
      howItWorks: "Cómo funciona",
      features: "Características",
      pricing: "Precios",
      integrations: "Integraciones",
      resources: "Recursos",
      affiliateSystem: "Sistema de afiliados",
      community: "Comunidad",
      signIn: "Iniciar sesión",
      startFree: "Comenzar gratis",
      join: "Unirte",
    },
    
    // Hero
    hero: {
      badge: "Construido para el futuro",
      badgeNews: "Novedades",
      title: "El CRM inteligente para\n cafeterías de especialidad",
      description: "Optimiza costos, controla stock e ingredientes, estandariza recetas y mejora la calidad de cada taza.",
      descriptionExtended: "Bourbon integra fidelización de clientes, carta digital, sitio web y analíticas con IA para hacer crecer tu cafetería.",
      startFree: "Comenzar gratis",
      viewFeatures: "Ver funcionalidades",
    },
    
    // Perks/Benefits
    perks: {
      badge: "Beneficios",
      title: "Todo lo que tu cafetería necesita",
      description: "Sistema de comandas en vivo, recetas estandarizadas y analizadas, control de proveedores, stock, empleados e ingresos. Incluye página web propia, sistema de afiliados y fidelización, según el plan.",
      groups: {
        operation: {
          title: "Operación",
          description: "Gestión de pedidos y canales",
          items: {
            liveOrders: { title: "Comandas en vivo", description: "Salón, barra y take-away con estados y tiempos." },
            qrOrders: { title: "Pedidos con QR", description: "Ordena desde la mesa o barra y sigue el estado." },
            omnichannel: { title: "Omnicanal", description: "Unifica canales y listas de precios por horario." },
            aiAgent: { title: "Agente IA", description: "Atención automatizada y toma de pedidos 24/7." },
          }
        },
        product: {
          title: "Producto",
          description: "Recetas, costos y calidad",
          items: {
            recipes: { title: "Recetas", description: "Gramajes, pasos, mermas y costos por bebida." },
            analysis: { title: "Análisis", description: "Margen, pricing sugerido y consistencia por lote." },
            batches: { title: "Lotes", description: "Trazabilidad y consumo por receta en tiempo real." },
            pricing: { title: "Precios", description: "Listas y reglas por canal u horario." },
          }
        },
        supply: {
          title: "Abastecimiento",
          description: "Proveedores y stock",
          items: {
            suppliers: { title: "Proveedores", description: "Órdenes de compra y listas de precios." },
            stock: { title: "Stock", description: "Depósitos, quiebres y alertas inteligentes." },
            onlineMenu: { title: "Carta online", description: "Fotos y descripciones por bebida (QR)." },
            affiliates: { title: "Afiliados", description: "Comisiones por referidos desde tu panel." },
          }
        },
        business: {
          title: "Negocio",
          description: "Equipo, ventas y fidelización",
          items: {
            team: { title: "Equipo y roles", description: "Permisos por rol y productividad por puesto." },
            revenue: { title: "Ingresos", description: "Ventas, ticket promedio y rentabilidad." },
            website: { title: "Sitio web", description: "Página propia integrada a tu carta." },
            loyalty: { title: "Fidelización", description: "Puntos, cupones y beneficios." },
          }
        }
      }
    },
    
    // Pricing
    pricing: {
      badge: "Elige tu plan",
      title: "Precios simples y transparentes",
      description: "Elige el plan que se adapte a tus necesidades. Sin tarifas ocultas, sin sorpresas.",
      monthly: "Mensual",
      yearly: "Anual",
      perMonth: "por mes",
      mostPopular: "Más Popular",
      plans: {
        barista: {
          title: "Barista",
          description: "Lo esencial para comenzar: carta online y control básico.",
          button: "Elegir Barista",
          features: [
            "Carta online con QR",
            "Control básico de stock",
            "Comandas simples (barra/salón)",
            "1 local / 3 usuarios",
            "Reportes básicos"
          ]
        },
        specialty: {
          title: "Especialidad",
          description: "Escala tu operación con recetas y analíticas.",
          button: "Elegir Especialidad",
          features: [
            "Recetas estandarizadas",
            "Costos y pricing sugerido",
            "Stock por lotes y alertas",
            "Fidelización (puntos y cupones)",
            "2 locales / 6 usuarios",
            "Analíticas con IA"
          ]
        },
        roaster: {
          title: "Tostador",
          description: "Operación multi-canal y automatizaciones.",
          button: "Elegir Tostador",
          features: [
            "Pedidos omnicanal (salón, barra, take-away)",
            "Listas de precios por canal y horario",
            "Agente IA de atención 24/7",
            "Sistema de afiliados propio",
            "Integraciones (impresoras, WhatsApp, etc.)",
            "5 locales / 12 usuarios",
            "Dashboards avanzados"
          ]
        },
        reserve: {
          title: "Reserva",
          description: "Implementación a medida para cadenas.",
          button: "Contactar Ventas",
          features: [
            "Locales y usuarios ilimitados",
            "Onboarding y éxito dedicado",
            "SSO y seguridad avanzada",
            "Workflows y reportes a medida",
            "Integraciones personalizadas"
          ]
        }
      }
    },
    
    // Companies
    companies: {
      title: "Cafeterías que confían"
    }
  },
  
  "en-US": {
    // Navbar
    navbar: {
      howItWorks: "How it works",
      features: "Features",
      pricing: "Pricing",
      integrations: "Integrations",
      resources: "Resources",
      affiliateSystem: "Affiliate System",
      community: "Community",
      signIn: "Sign In",
      startFree: "Start Free",
      join: "Join",
    },
    
    // Hero
    hero: {
      badge: "Built for the future",
      badgeNews: "News",
      title: "The intelligent CRM for\n specialty coffee shops",
      description: "Optimize costs, control stock and ingredients, standardize recipes and improve the quality of each cup.",
      descriptionExtended: "Bourbon integrates customer loyalty, digital menu, website and AI analytics to grow your coffee shop.",
      startFree: "Start Free",
      viewFeatures: "View Features",
    },
    
    // Perks/Benefits
    perks: {
      badge: "Benefits",
      title: "Everything your coffee shop needs",
      description: "Live order system, standardized and analyzed recipes, supplier control, stock, employees and revenue. Includes own website, affiliate system and loyalty, according to plan.",
      groups: {
        operation: {
          title: "Operations",
          description: "Order and channel management",
          items: {
            liveOrders: { title: "Live Orders", description: "Dine-in, bar and take-away with status and timing." },
            qrOrders: { title: "QR Orders", description: "Order from table or bar and track status." },
            omnichannel: { title: "Omnichannel", description: "Unify channels and price lists by schedule." },
            aiAgent: { title: "AI Agent", description: "Automated support and order taking 24/7." },
          }
        },
        product: {
          title: "Product",
          description: "Recipes, costs and quality",
          items: {
            recipes: { title: "Recipes", description: "Weights, steps, waste and costs per drink." },
            analysis: { title: "Analysis", description: "Margin, suggested pricing and batch consistency." },
            batches: { title: "Batches", description: "Traceability and recipe consumption in real time." },
            pricing: { title: "Pricing", description: "Lists and rules by channel or schedule." },
          }
        },
        supply: {
          title: "Supply Chain",
          description: "Suppliers and stock",
          items: {
            suppliers: { title: "Suppliers", description: "Purchase orders and price lists." },
            stock: { title: "Stock", description: "Warehouses, stockouts and smart alerts." },
            onlineMenu: { title: "Online Menu", description: "Photos and descriptions per drink (QR)." },
            affiliates: { title: "Affiliates", description: "Commissions for referrals from your panel." },
          }
        },
        business: {
          title: "Business",
          description: "Team, sales and loyalty",
          items: {
            team: { title: "Team & Roles", description: "Role permissions and productivity per position." },
            revenue: { title: "Revenue", description: "Sales, average ticket and profitability." },
            website: { title: "Website", description: "Own page integrated to your menu." },
            loyalty: { title: "Loyalty", description: "Points, coupons and benefits." },
          }
        }
      }
    },
    
    // Pricing
    pricing: {
      badge: "Choose your plan",
      title: "Simple and transparent pricing",
      description: "Choose the plan that fits your needs. No hidden fees, no surprises.",
      monthly: "Monthly",
      yearly: "Yearly",
      perMonth: "per month",
      mostPopular: "Most Popular",
      plans: {
        barista: {
          title: "Barista",
          description: "The essentials to get started: online menu and basic control.",
          button: "Choose Barista",
          features: [
            "Online menu with QR",
            "Basic stock control",
            "Simple orders (bar/dine-in)",
            "1 location / 3 users",
            "Basic reports"
          ]
        },
        specialty: {
          title: "Specialty",
          description: "Scale your operation with recipes and analytics.",
          button: "Choose Specialty",
          features: [
            "Standardized recipes",
            "Costs and suggested pricing",
            "Stock by batches and alerts",
            "Loyalty (points and coupons)",
            "2 locations / 6 users",
            "AI analytics"
          ]
        },
        roaster: {
          title: "Roaster",
          description: "Multi-channel operation and automations.",
          button: "Choose Roaster",
          features: [
            "Omnichannel orders (dine-in, bar, take-away)",
            "Price lists by channel and schedule",
            "24/7 AI customer service agent",
            "Own affiliate system",
            "Integrations (printers, WhatsApp, etc.)",
            "5 locations / 12 users",
            "Advanced dashboards"
          ]
        },
        reserve: {
          title: "Reserve",
          description: "Custom implementation for chains.",
          button: "Contact Sales",
          features: [
            "Unlimited locations and users",
            "Dedicated onboarding and success",
            "SSO and advanced security",
            "Custom workflows and reports",
            "Custom integrations"
          ]
        }
      }
    },
    
    // Companies
    companies: {
      title: "Coffee shops that trust us"
    }
  },
  
  "pt-BR": {
    // Navbar
    navbar: {
      howItWorks: "Como funciona",
      features: "Recursos",
      pricing: "Preços",
      integrations: "Integrações",
      resources: "Recursos",
      affiliateSystem: "Sistema de Afiliados",
      community: "Comunidade",
      signIn: "Entrar",
      startFree: "Começar Grátis",
      join: "Participar",
    },
    
    // Hero
    hero: {
      badge: "Construído para o futuro",
      badgeNews: "Novidades",
      title: "O CRM inteligente para\n cafeterias especiais",
      description: "Otimize custos, controle estoque e ingredientes, padronize receitas e melhore a qualidade de cada xícara.",
      descriptionExtended: "Bourbon integra fidelização de clientes, cardápio digital, site e análises com IA para fazer crescer sua cafeteria.",
      startFree: "Começar Grátis",
      viewFeatures: "Ver Funcionalidades",
    },
    
    // Perks/Benefits
    perks: {
      badge: "Benefícios",
      title: "Tudo que sua cafeteria precisa",
      description: "Sistema de comandas ao vivo, receitas padronizadas e analisadas, controle de fornecedores, estoque, funcionários e receita. Inclui site próprio, sistema de afiliados e fidelização, conforme o plano.",
      groups: {
        operation: {
          title: "Operação",
          description: "Gestão de pedidos e canais",
          items: {
            liveOrders: { title: "Comandas ao vivo", description: "Salão, bar e take-away com status e tempos." },
            qrOrders: { title: "Pedidos com QR", description: "Peça da mesa ou bar e acompanhe o status." },
            omnichannel: { title: "Omnichannel", description: "Unifique canais e listas de preços por horário." },
            aiAgent: { title: "Agente IA", description: "Atendimento automatizado e tomada de pedidos 24/7." },
          }
        },
        product: {
          title: "Produto",
          description: "Receitas, custos e qualidade",
          items: {
            recipes: { title: "Receitas", description: "Gramagens, passos, perdas e custos por bebida." },
            analysis: { title: "Análise", description: "Margem, preço sugerido e consistência por lote." },
            batches: { title: "Lotes", description: "Rastreabilidade e consumo por receita em tempo real." },
            pricing: { title: "Preços", description: "Listas e regras por canal ou horário." },
          }
        },
        supply: {
          title: "Abastecimento",
          description: "Fornecedores e estoque",
          items: {
            suppliers: { title: "Fornecedores", description: "Ordens de compra e listas de preços." },
            stock: { title: "Estoque", description: "Depósitos, rupturas e alertas inteligentes." },
            onlineMenu: { title: "Cardápio online", description: "Fotos e descrições por bebida (QR)." },
            affiliates: { title: "Afiliados", description: "Comissões por indicações do seu painel." },
          }
        },
        business: {
          title: "Negócio",
          description: "Equipe, vendas e fidelização",
          items: {
            team: { title: "Equipe e funções", description: "Permissões por função e produtividade por posto." },
            revenue: { title: "Receita", description: "Vendas, ticket médio e rentabilidade." },
            website: { title: "Site", description: "Página própria integrada ao seu cardápio." },
            loyalty: { title: "Fidelização", description: "Pontos, cupons e benefícios." },
          }
        }
      }
    },
    
    // Pricing
    pricing: {
      badge: "Escolha seu plano",
      title: "Preços simples e transparentes",
      description: "Escolha o plano que se adapta às suas necessidades. Sem taxas ocultas, sem surpresas.",
      monthly: "Mensal",
      yearly: "Anual",
      perMonth: "por mês",
      mostPopular: "Mais Popular",
      plans: {
        barista: {
          title: "Barista",
          description: "O essencial para começar: cardápio online e controle básico.",
          button: "Escolher Barista",
          features: [
            "Cardápio online com QR",
            "Controle básico de estoque",
            "Comandas simples (bar/salão)",
            "1 local / 3 usuários",
            "Relatórios básicos"
          ]
        },
        specialty: {
          title: "Especialidade",
          description: "Escale sua operação com receitas e análises.",
          button: "Escolher Especialidade",
          features: [
            "Receitas padronizadas",
            "Custos e preço sugerido",
            "Estoque por lotes e alertas",
            "Fidelização (pontos e cupons)",
            "2 locais / 6 usuários",
            "Análises com IA"
          ]
        },
        roaster: {
          title: "Torrador",
          description: "Operação multicanal e automações.",
          button: "Escolher Torrador",
          features: [
            "Pedidos omnichannel (salão, bar, take-away)",
            "Listas de preços por canal e horário",
            "Agente IA de atendimento 24/7",
            "Sistema de afiliados próprio",
            "Integrações (impressoras, WhatsApp, etc.)",
            "5 locais / 12 usuários",
            "Dashboards avançados"
          ]
        },
        reserve: {
          title: "Reserva",
          description: "Implementação personalizada para redes.",
          button: "Contatar Vendas",
          features: [
            "Locais e usuários ilimitados",
            "Onboarding e sucesso dedicado",
            "SSO e segurança avançada",
            "Workflows e relatórios personalizados",
            "Integrações personalizadas"
          ]
        }
      }
    },
    
    // Companies
    companies: {
      title: "Cafeterias que confiam"
    }
  }
} as const;

export const getTranslation = (lang: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  // If translation not found, fallback to Spanish
  if (!value && lang !== "es-AR") {
    let fallback: any = translations["es-AR"];
    for (const k of keys) {
      fallback = fallback?.[k];
    }
    return fallback || key;
  }
  
  return value || key;
};

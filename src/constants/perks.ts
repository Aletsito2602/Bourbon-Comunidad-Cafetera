import {
  ReceiptIcon,
  BotIcon,
  ChefHatIcon,
  ChartSplineIcon,
  TruckIcon,
  BoxesIcon,
  Users2Icon,
  PiggyBankIcon,
  GlobeIcon,
  QrCodeIcon,
  HeartHandshakeIcon,
  LinkIcon
} from "lucide-react";
import React from "react";

// Grupos de beneficios (para UI agrupada: 4 columnas)
export const PERK_GROUPS = [
  {
    title: "Operación",
    description: "Gestión de pedidos y canales",
    items: [
      { icon: ReceiptIcon, title: "Comandas en vivo", description: "Salón, barra y take-away con estados y tiempos." },
      { icon: QrCodeIcon, title: "Pedidos con QR", description: "Ordena desde la mesa o barra y sigue el estado." },
      { icon: LinkIcon, title: "Omnicanal", description: "Unifica canales y listas de precios por horario." },
      { icon: BotIcon, title: "Agente IA", description: "Atención automatizada y toma de pedidos 24/7." },
    ],
  },
  {
    title: "Producto",
    description: "Recetas, costos y calidad",
    items: [
      { icon: ChefHatIcon, title: "Recetas", description: "Gramajes, pasos, mermas y costos por bebida." },
      { icon: ChartSplineIcon, title: "Análisis", description: "Margen, pricing sugerido y consistencia por lote." },
      { icon: BoxesIcon, title: "Lotes", description: "Trazabilidad y consumo por receta en tiempo real." },
      { icon: PiggyBankIcon, title: "Precios", description: "Listas y reglas por canal u horario." },
    ],
  },
  {
    title: "Abastecimiento",
    description: "Proveedores y stock",
    items: [
      { icon: TruckIcon, title: "Proveedores", description: "Órdenes de compra y listas de precios." },
      { icon: BoxesIcon, title: "Stock", description: "Depósitos, quiebres y alertas inteligentes." },
      { icon: GlobeIcon, title: "Carta online", description: "Fotos y descripciones por bebida (QR)." },
      { icon: HeartHandshakeIcon, title: "Afiliados", description: "Comisiones por referidos desde tu panel." },
    ],
  },
  {
    title: "Negocio",
    description: "Equipo, ventas y fidelización",
    items: [
      { icon: Users2Icon, title: "Equipo y roles", description: "Permisos por rol y productividad por puesto." },
      { icon: PiggyBankIcon, title: "Ingresos", description: "Ventas, ticket promedio y rentabilidad." },
      { icon: GlobeIcon, title: "Sitio web", description: "Página propia integrada a tu carta." },
      { icon: HeartHandshakeIcon, title: "Fidelización", description: "Puntos, cupones y beneficios." },
    ],
  },
];

// Beneficios principales de la plataforma Bourbon para cafeterías
export const PERKS = [
  {
    icon: ReceiptIcon,
    title: "Sistema de comandas",
    description: "Toma y gestiona comandas en vivo para salón, barra y take-away, con estados y tiempos." 
  },
  {
    icon: BotIcon,
    title: "Agente IA 24/7",
    description: "Atención al cliente automatizada, respuestas a preguntas frecuentes y toma de pedidos asistida." 
  },
  {
    icon: ChefHatIcon,
    title: "Recetas estandarizadas",
    description: "Define recetas de especialidad con gramajes, costos, mermas y pasos de preparación." 
  },
  {
    icon: ChartSplineIcon,
    title: "Análisis de recetas",
    description: "Calcula costos por bebida, margen, pricing sugerido y calidad consistente por lote." 
  },
  {
    icon: TruckIcon,
    title: "Control de proveedores",
    description: "Gestiona proveedores, órdenes de compra, listas de precios y recepción de insumos." 
  },
  {
    icon: BoxesIcon,
    title: "Stock y trazabilidad",
    description: "Inventario por depósitos y lotes, alertas de quiebre y consumo por receta en tiempo real." 
  },
  {
    icon: Users2Icon,
    title: "Equipo y roles",
    description: "Control de empleados, permisos por rol y registro de productividad por puesto." 
  },
  {
    icon: PiggyBankIcon,
    title: "Ingresos y métricas",
    description: "Dashboards de ventas, tickets promedio, costos y rentabilidad por canal y horario." 
  },
  {
    icon: GlobeIcon,
    title: "Sitio y carta online",
    description: "Página web propia y carta digital con QR, fotos y descripciones por bebida." 
  },
  {
    icon: QrCodeIcon,
    title: "Pedidos con QR",
    description: "Tus clientes ordenan desde la mesa o barra con QR y seguimiento de estados." 
  },
  {
    icon: HeartHandshakeIcon,
    title: "Fidelización",
    description: "Programa de puntos, cupones y beneficios para retener y premiar a tus clientes." 
  },
  {
    icon: LinkIcon,
    title: "Sistema de afiliados",
    description: "Gana comisiones recomendando Bourbon a otras cafeterías desde tu panel." 
  }
];
import { ClockIcon, MessageSquare, BarChart2, FileTextIcon, UserPlusIcon, CreditCardIcon, SettingsIcon, LogOut, Headphones, ChartPieIcon, LucideIcon, MessagesSquareIcon, NewspaperIcon, MegaphoneIcon, LineChartIcon, MessageSquareTextIcon, UsersIcon } from 'lucide-react';

type Link = {
    href: string;
    label: string;
    icon: LucideIcon;
}

export const SIDEBAR_LINKS: Link[] = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: ChartPieIcon,
    },
    {
        href: "/dashboard/campaigns",
        label: "Campaigns",
        icon: MegaphoneIcon
    },
    {
        href: "/dashboard/analytics",
        label: "Analytics",
        icon: LineChartIcon
    },
    {
        href: "/dashboard/posts",
        label: "Posts",
        icon: MessageSquareTextIcon
    },
    {
        href: "/dashboard/engagement",
        label: "Engagement",
        icon: UsersIcon
    },
    {
        href: "/dashboard/billing",
        label: "Billing",
        icon: CreditCardIcon
    },
    {
        href: "/dashboard/settings",
        label: "Settings",
        icon: SettingsIcon
    },
];

export const FOOTER_LINKS = [
    {
        title: "Producto",
        links: [
            { name: "Inicio", href: "/" },
            { name: "Características", href: "/features" },
            { name: "Precios", href: "/pricing" },
            { name: "Contacto", href: "/contact" },
            { name: "Descargar", href: "/download" },
        ],
    },
    {
        title: "Recursos",
        links: [
            { name: "Blog", href: "/blog" },
            { name: "Centro de Ayuda", href: "/help-center" },
            { name: "Comunidad", href: "/community" },
            { name: "Guías", href: "/guides" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacidad", href: "/privacy" },
            { name: "Términos", href: "/terms" },
            { name: "Cookies", href: "/cookies" },
        ],
    },
];

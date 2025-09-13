import { PERK_GROUPS } from "@/constants";
import { cn } from "@/functions";
import { LucideIcon } from "lucide-react";
import Container from "../global/container";
import { SectionBadge } from "../ui/section-bade";

const Perks = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-24 w-full">
            <Container>
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                    <SectionBadge title="Beneficios" />
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
                        Todo lo que tu cafetería necesita
                    </h2>
                    <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
                        Sistema de comandas en vivo, recetas estandarizadas y analizadas, control de proveedores, stock, empleados e ingresos. Incluye página web propia, sistema de afiliados y fidelización, según el plan.
                    </p>
                </div>
            </Container>
            <Container>
                <div className="mt-16 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                        {PERK_GROUPS.map((group, idx) => (
                            <GroupCard key={idx} {...group} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
};

type Group = {
    title: string;
    description: string;
    items: { icon: LucideIcon; title: string; description: string }[];
};

const GroupCard = ({ title, description, items }: Group) => {
    return (
        <div className="group relative border rounded-xl p-5 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-heading heading">{title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{description}</p>
                </div>
            </div>

            {/* Subitems: visibles por defecto en todas las resoluciones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {items.map((it, i) => (
                    <MiniPerk key={i} {...it} />
                ))}
            </div>
        </div>
    );
};

const MiniPerk = ({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) => {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/20">
            <Icon className="w-5 h-5 text-muted-foreground mt-0.5" strokeWidth={1.6} />
            <div>
                <p className="text-sm font-medium heading">{title}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </div>
    );
};

export default Perks

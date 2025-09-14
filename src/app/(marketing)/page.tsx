import { Background, Companies, Connect, Container, CTA, Features, Hero, Perks, Pricing, Reviews, Rewards, Wrapper } from "@/components";
import { Spotlight } from "@/components/ui/spotlight";

const HomePage = () => {
    return (
        <Background>
            <Wrapper className="py-20 relative">
                <Container className="relative">
                    <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="rgba(255, 255, 255, 0.5)"
                    />
                    <Hero />
                </Container>
                <Container className="py-8 lg:py-20">
                    <Companies />
                </Container>
                <Perks />
                <Rewards />
                <Pricing />
                <Reviews />
                <CTA />
            </Wrapper>
        </Background>
    )
};

export default HomePage

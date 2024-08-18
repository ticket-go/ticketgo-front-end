import { HeroEvent } from "@/components/hero-event";
import type { HeroEvent as Event } from "@/types/event-hero";

const events: Event = {
  name: "FINECAP 2024 - Ingressos",
  description:
    "Prefeitura de Pau dos Ferros, através da Secretaria de Cultura e Turismo (SECULT), anunciou na noite deste domingo (26) as programações completas do São João da Princesinha e da FINECAP, que acontecem nos meses de junho e outubro de 2024, respectivamente.",
  time: "00:00",
  image: "/assets/images/banner-vertical.svg",
  date: "00/00/0000",
  address: {
    street: "Rua do Chafariz",
    number: 28,
    city: "Paulo dos Ferros",
    state: "RN",
  },
};

export async function MainHeroEvent() {
  return <div>{events && <HeroEvent event={events} />}</div>;
}

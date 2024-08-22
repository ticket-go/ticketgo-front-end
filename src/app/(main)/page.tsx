import { MainEvents } from "./_components/main-events";
import { MainHeroEvent } from "./_components/main-hero-event";
import { EventCategories } from "./_components/main-category-event";
import { Carousel } from "@/components/carousel";
import { Typography } from "@/components/typography";
import { FilterByCategoryOrEventNameForm } from "@/components/filter-by-category-or-event-name";

export default function Home() {
  const addresses = [
    {
      uuidw: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      street: "Rua das Flores",
      number: 123,
      city: "Cidade Exemplo",
      state: "SP",
      district: "Bairro Jardim",
      zip_code: "12345-678",
      country: "Brasil",
      complement: "Apartamento 101"
    },
    {
      uuidw: "5fa85f64-5717-4562-b3fc-2c963f66afa7",
      street: "Avenida Central",
      number: 456,
      city: "Cidade Modelo",
      state: "RJ",
      district: "Centro",
      zip_code: "23456-789",
      country: "Brasil",
      complement: "Casa 2"
    },
    {
      uuidw: "7fa85f64-5717-4562-b3fc-2c963f66afa8",
      street: "Rua da Praia",
      number: 789,
      city: "Cidade Litorânea",
      state: "BA",
      district: "Praia Grande",
      zip_code: "34567-890",
      country: "Brasil",
      complement: "Cobertura 3"
    }
  ];

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-8 mb-8">
      <section className="flex flex-col w-full h-full py-8 px-20 gap-4">
        <Typography fontWeight={"bold"}>Filtro top</Typography>
        <FilterByCategoryOrEventNameForm address={addresses}/>
      </section>

      <section className="w-full h-full py-8">
        <MainHeroEvent />
      </section>

      <section className="w-full h-full py-8 px-10">
        <EventCategories />
      </section>

      <section className="flex flex-col w-full h-full py-8 px-20 gap-4">
        <Typography fontWeight={"bold"}>Eventos do mês</Typography>
        <MainEvents />
      </section>

      <section className="py-8 px-20">
        <Typography variant="h4" fontWeight="extrabold">
          Eventos em destaque
        </Typography>
        <Carousel />
      </section>

      <section className="flex flex-col w-full h-full py-8 px-20 gap-4">
        <Typography fontWeight={"bold"}>Eventos mais badalados</Typography>
        <MainEvents />
      </section>

      <section className="flex flex-col w-full h-full py-8 px-20 gap-4">
        <Typography fontWeight={"bold"}>Promoções</Typography>
        <MainEvents />
      </section>

    </main>
  );
}

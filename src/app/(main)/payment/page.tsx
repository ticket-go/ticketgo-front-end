import { Section } from "@/components/section";
import { Typography } from "@/components/typography";
import { Cart } from "./_components/cart";

export default function Payment() {
  return (
    <main className="flex justify-center items-center w-full h-screen bg-background">
      <Section className="flex justify-center items-start w-full h-fit px-10 mobile:px-4 mobile:w-full">
        <Typography variant={"h4"} fontWeight={"bold"}>
          Carrinho de compras
        </Typography>
        <Cart />
      </Section>
    </main>
  );
}

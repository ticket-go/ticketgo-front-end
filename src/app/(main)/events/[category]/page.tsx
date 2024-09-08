import { fetchEvents } from "@/actions/fetch-events";
import { MainEvents } from "../../_components/main-events";
import { Section } from "@/components/section";
import { FilterEvents } from "../../_components/filter";

export default async function EventsCategory({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const events = await fetchEvents();

  const matchedCategoryEvent = events.find(
    (event) => event.category === category
  );
  const selectCategoryName = matchedCategoryEvent?.category_display;

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-background mt-20">
      <div className="w-full">
        <Section>
          <FilterEvents
            selectCategory={`${selectCategoryName}`}
            events={events}
          />
          <MainEvents events={events} category={params.category} />
        </Section>
      </div>
    </main>
  );
}

import { fetchCategoryByEvents } from "@/actions/fetch-categories-by-event";
import { EventCategory } from "@/components/event-category";

export async function EventCategories() {
  const categories = await fetchCategoryByEvents();
  const uniqueCategories = Array.from(
    new Set(categories.map((category) => category.category))
  ).map((category) => categories.find((cat) => cat.category === category));

  return (
    <div className="grid grid-cols-6 col-span-* justify-items-center w-full h-full">
      {uniqueCategories.map((category) => (
        <EventCategory key={category?.category} event={category!} />
      ))}
    </div>
  );
}

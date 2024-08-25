import { fetchCategoryByEvents } from "@/actions/fetch-categories-by-event";
import { EventCategory } from "@/components/event-category";

export async function EventCategories() {
  const categories = await fetchCategoryByEvents();

  console.log("print", categories)

  return (
    <div className="grid grid-cols-6 col-span-* justify-items-center w-full h-full">
      {categories.map((category) => (
        <EventCategory key={category.category} event={category} image="entretenimento" />
      ))}
    </div>
  );
}

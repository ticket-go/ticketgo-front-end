import { fetchCategoryByEvents } from "@/actions/fetch-categories-by-event";
import { EventCategory } from "@/components/event-category";

export async function EventCategories() {
  const categories = await fetchCategoryByEvents();

  const uniqueCategories = categories.reduce((acc, category) => {
    if (!acc.find((cat) => cat.category === category.category)) {
      acc.push(category);
    }
    return acc;
  }, [] as typeof categories);

  return (
    <div className="flex overflow-x-auto gap-2 sm:gap-4 justify-between items-center w-full h-full">
      {uniqueCategories.map((category) => (
        category && (
          <EventCategory key={category.category} event={category} />
        )
      ))}
    </div>
  );
}

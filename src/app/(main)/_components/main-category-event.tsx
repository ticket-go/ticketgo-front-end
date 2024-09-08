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
    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center w-full h-full">
      {uniqueCategories.map((category) => (
        category && (
          <EventCategory key={category.category} event={category} />
        )
      ))}
    </div>
  );
}

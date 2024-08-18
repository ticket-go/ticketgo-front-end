import exp from "constants";
import { EventCategoryPageObjects, initialProps } from "./event-category.page";

const pageObjects = EventCategoryPageObjects(initialProps);

describe("EventCard", () => {
  it("should render event card", () => {
    pageObjects.render();
    expect(pageObjects.getEventCategoryContainer()).toBeInTheDocument();
    expect(pageObjects.getEventCategoryImage()).toBeInTheDocument();
    expect(pageObjects.getEventCategoryName()).toBeInTheDocument();
  });

  it("should render event card with correct props", () => {
    pageObjects.render();
    expect(pageObjects.getEventCategoryName().textContent).toBe(
      initialProps.event.category_display
    );
  });
});

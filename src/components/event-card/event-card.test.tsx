import { EventCardPageObjects, initialProps } from "./event-card.page";

const pageObjects = EventCardPageObjects(initialProps);

describe("EventCard", () => {
  it("should render EventCard component", () => {
    pageObjects.render();
    expect(pageObjects.getEventCardContainer()).toBeInTheDocument();
    expect(pageObjects.getEventCardTitle()).toBeInTheDocument();
    expect(pageObjects.getEventCardDateHour()).toHaveLength(1);
    expect(pageObjects.getEventCardLocation()).toBeInTheDocument();
    expect(pageObjects.getEventCardButton()).toBeInTheDocument();
  });

  it("should render EventCard component with props", () => {
    pageObjects.render();
    expect(pageObjects.getEventCardTitle()).toHaveTextContent(
      initialProps.title
    );
    expect(pageObjects.getEventCardDateHour()).toHaveTextContent(
      `${initialProps.date} - ${initialProps.hour}`
    );
    expect(pageObjects.getEventCardLocation()).toHaveTextContent(
      initialProps.location
    );
  });
});

import exp from "constants";
import { HeroEventPageObjects, initialProps } from "./hero-event.page";

const pageObjects = HeroEventPageObjects(initialProps);

describe("HeroEvent", () => {
  it("should render the HeroEvent component", () => {
    pageObjects.render();
    expect(pageObjects.getHeroEventContainer()).toBeInTheDocument();
    expect(pageObjects.getHeroEventImage()).toBeInTheDocument();
    expect(pageObjects.getHeroEventName()).toBeInTheDocument();
    expect(pageObjects.getHeroEventDescription()).toBeInTheDocument();
    expect(pageObjects.getHeroEventTime()).toBeInTheDocument();
    expect(pageObjects.getHeroEventAddress()).toBeInTheDocument();
    expect(pageObjects.getHeroEventButton()).toBeInTheDocument;
  });

  it("should render the HeroEvent component with the correct props", () => {
    pageObjects.render();
    expect(pageObjects.getHeroEventName()).toHaveTextContent("Hero Event");
    expect(pageObjects.getHeroEventDescription()).toHaveTextContent(
      "Hero Event Description"
    );
    expect(pageObjects.getHeroEventTime()).toHaveTextContent("00:00");
  });
});

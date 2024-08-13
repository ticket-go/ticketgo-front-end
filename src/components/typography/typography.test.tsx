import { initialProps, TypographyPageObjects } from "./typography.page";

const pageObjects = TypographyPageObjects(initialProps);

describe("Typography", () => {
  it("should render Typography", () => {
    pageObjects.render();
    expect(pageObjects.getTypographyText()).toBeInTheDocument();
  });
  it("should render Typography with children", () => {
    pageObjects.render();
    expect(pageObjects.getTypographyText()).toHaveTextContent("Typography");
  });
  it("should render Typography with variant", () => {
    pageObjects.render();
    expect(pageObjects.getTypographyText()).toHaveClass("text-[40px]");
    expect(pageObjects.getTypographyText()).toHaveClass("font-bold");
    expect(pageObjects.getTypographyText()).toHaveClass("text-primary");
  });
});

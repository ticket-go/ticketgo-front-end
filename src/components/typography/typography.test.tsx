import { content, TypographyPageObjects } from "./typography.page";

const pageObjects = TypographyPageObjects();

describe("Typography", () => {
  it("should render the text", () => {
    pageObjects.render();
    expect(pageObjects.getTypographyText()).toBeInTheDocument();
    expect(pageObjects.getTypographyText()).toHaveTextContent(content);
  });
});

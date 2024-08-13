import { HeaderPageObjects } from "./header.page";

const pageObjects = HeaderPageObjects();

describe("Header", () => {
  it("should render Header", () => {
    pageObjects.render();
    expect(pageObjects.getHeaderContainer()).toBeInTheDocument();
    expect(pageObjects.getHeaderTitleLogo()).toBeInTheDocument();
    expect(pageObjects.getHeaderSearchInput()).toBeInTheDocument();
  });

  it("should render Header with children", () => {
    pageObjects.render();
    expect(pageObjects.getHeaderTitleLogo()).toHaveTextContent("TicketGO");
    expect(pageObjects.getHeaderNavItem()).toHaveLength(3);
    expect(pageObjects.getHeaderButton()).toHaveLength(2);
  });

  it("should render Header NavItems with children values", () => {
    pageObjects.render();
    expect(pageObjects.getHeaderNavItem()[0]).toHaveTextContent("Eventos");
    expect(pageObjects.getHeaderNavItem()[1]).toHaveTextContent("Eventos");
    expect(pageObjects.getHeaderNavItem()[2]).toHaveTextContent("Eventos");
  });
});

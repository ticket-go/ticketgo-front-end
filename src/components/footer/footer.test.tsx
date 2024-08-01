import { FooterPageObjects } from "./footer.page";

const pageObjects = FooterPageObjects();

describe("Header", () => {
  it("should render Footer", () => {
    pageObjects.render();
    expect(pageObjects.getFooterContainer()).toBeInTheDocument();
    expect(pageObjects.getFooterTitleLogo()).toBeInTheDocument();
    expect(pageObjects.getFooterCopyrightText()).toBeInTheDocument();
    expect(pageObjects.getFooterNavItem()).toHaveLength(9);
  });

  it("should render Footer with children", () => {
    pageObjects.render();
    expect(pageObjects.getFooterTitleLogo()).toHaveTextContent("TicketGO");
    expect(pageObjects.getFooterNavItem()).toHaveLength(9);
  });

  it("should render Footer NavItems with children values", () => {
    pageObjects.render();
    expect(pageObjects.getFooterNavItem()[0]).toHaveTextContent("Sobre nós");
    expect(pageObjects.getFooterNavItem()[1]).toHaveTextContent(
      "Para empreendedores"
    );
    expect(pageObjects.getFooterNavItem()[2]).toHaveTextContent(
      "Trabalhe conosco"
    );
    expect(pageObjects.getFooterNavItem()[3]).toHaveTextContent(
      "Termos de uso"
    );
    expect(pageObjects.getFooterNavItem()[4]).toHaveTextContent(
      "Política de privacidade"
    );
  });
});

import {
  MenuUserOptionsPageObjects,
  initalProps,
} from "./menu-user-options.page";

const pageObjects = MenuUserOptionsPageObjects(initalProps);

describe("MenuUserOptions", () => {
  it("should render MenuUserOptions", () => {
    pageObjects.render();
    expect(pageObjects.getMenuUserContainer()).toBeInTheDocument();
    expect(pageObjects.getMenuUserButtonTrigger()).toBeInTheDocument();
    expect(pageObjects.getMenuUserContentOptions()).toHaveLength(1);
  });

  it("should render MenuUserOptions with username", () => {
    pageObjects.render();
    expect(pageObjects.getMenuUserButtonTrigger()).toHaveTextContent(
      "username"
    );
  });

  it("should render MenuUserOptions with options", () => {
    pageObjects.render();
    expect(pageObjects.getMenuUserOptions()).toHaveTextContent("Sair");
  });
});

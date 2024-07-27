import { render } from "@testing-library/react";

export enum PAGE_OBJECT_TYPE {
  THEME = "themeWrapper",
}

global.console = {
  ...console,
  error: jest.fn(),
};

interface RenderPageObjects {
  component: JSX.Element;
}

export const renderPageObjects = ({ component }: RenderPageObjects) => {
  return render(component);
};

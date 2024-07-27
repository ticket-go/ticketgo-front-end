import { renderPageObjects } from "@/test-utils";
import { screen } from "@testing-library/react";

import { Typography } from ".";

const TYPGRAPHY_TEXT_TEST_ID = "typography-text-value";

export const content: string = "Hello, World!";

export const TypographyPageObjects = () => {
  const render = () => {
    return renderPageObjects({
      component: <Typography>{content}</Typography>,
    });
  };

  const getTypographyText = () => screen.getByTestId(TYPGRAPHY_TEXT_TEST_ID);

  return {
    render,
    getTypographyText,
  };
};

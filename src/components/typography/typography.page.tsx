import { renderPageObjects } from "@/test-utils";
import { screen } from "@testing-library/react";
import { Typography, TypographyGroupProps } from ".";

const TYPGRAPHY_TEXT_TEST_ID = "typography-text-value";

export const initialProps: TypographyGroupProps = {
  children: "Typography",
  variant: "h2",
  fontWeight: "bold",
  color: "primary",
};

export const TypographyPageObjects = (props: TypographyGroupProps) => {
  const render = (otherProps = initialProps) => {
    return renderPageObjects({
      component: (
        <Typography {...props} {...otherProps}>
          {props.children}
        </Typography>
      ),
    });
  };

  const getTypographyText = () => screen.getByTestId(TYPGRAPHY_TEXT_TEST_ID);

  return {
    render,
    getTypographyText,
  };
};

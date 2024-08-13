import { renderPageObjects } from "@/test-utils";
import { screen } from "@testing-library/react";
import { MenuUserOptions, MenuUserOptionsProps } from ".";

export const initalProps: MenuUserOptionsProps = {
  username: "username",
};

const MENU_USER_CONTAINER_TEST_ID = "menu-user-container";
const MENU_USER_BUTTON_TRIGGER_TEST_ID = "menu-user-button-trigger";
const MENU_USER_BUTTON_USERNAME_TEST_ID = "menu-user-button-username";
const MENU_USER_CONTENT_OPTIONS_TEST_ID = "menu-user-content-options";
const MENU_USER_OPTIONS_TEST_ID = "menu-user-options";

export const MenuUserOptionsPageObjects = (props: MenuUserOptionsProps) => {
  const render = (otherProps = initalProps) => {
    return renderPageObjects({
      component: <MenuUserOptions {...props} {...otherProps} />,
    });
  };

  const getMenuUserContainer = () =>
    screen.getByTestId(MENU_USER_CONTAINER_TEST_ID);

  const getMenuUserButtonTrigger = () =>
    screen.getByTestId(MENU_USER_BUTTON_TRIGGER_TEST_ID);

  const getMenuUserButtonUsername = () =>
    screen.getByTestId(MENU_USER_BUTTON_USERNAME_TEST_ID);

  const getMenuUserContentOptions = () =>
    screen.getAllByTestId(MENU_USER_CONTENT_OPTIONS_TEST_ID);

  const getMenuUserOptions = () =>
    screen.getByTestId(MENU_USER_OPTIONS_TEST_ID);

  return {
    render,
    getMenuUserContainer,
    getMenuUserButtonTrigger,
    getMenuUserButtonUsername,
    getMenuUserContentOptions,
    getMenuUserOptions,
  };
};

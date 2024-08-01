import { renderPageObjects } from "@/test-utils";
import { screen } from "@testing-library/react";
import { Header } from ".";

const HEADER_CONTAINER_TEST_ID = "header-container";
const HEADER_TITLE_LOGO_TEST_ID = "header-title-logo";
const HEADER_SEARCH_INPUT_TEST_ID = "header-search-input";
const HEADER_NAV_ITEM_TEST_ID = "header-nav-item";
const HEADER_BUTTON_TEST_ID = "header-button";

export const HeaderPageObjects = () => {
  const render = () => {
    return renderPageObjects({
      component: <Header />,
    });
  };

  const getHeaderContainer = () => screen.getByTestId(HEADER_CONTAINER_TEST_ID);

  const getHeaderTitleLogo = () =>
    screen.getByTestId(HEADER_TITLE_LOGO_TEST_ID);

  const getHeaderSearchInput = () =>
    screen.getByTestId(HEADER_SEARCH_INPUT_TEST_ID);

  const getHeaderNavItem = () => screen.getAllByTestId(HEADER_NAV_ITEM_TEST_ID);

  const getHeaderButton = () => screen.getAllByTestId(HEADER_BUTTON_TEST_ID);

  return {
    render,
    getHeaderContainer,
    getHeaderTitleLogo,
    getHeaderSearchInput,
    getHeaderNavItem,
    getHeaderButton,
  };
};

import { renderPageObjects } from "@/test-utils";
import { screen } from "@testing-library/react";
import { Footer } from ".";

const FOOTER_CONTAINER_TEST_ID = "footer-container";
const FOOTER_TITLE_TEST_ID = "footer-title";
const FOOTER_COPYRIGHT_TEXT_TEST_ID = "footer-copyright-text";
const FOOTER_NAV_ITEM_TEST_ID = "footer-nav-item";

export const FooterPageObjects = () => {
  const render = () => {
    return renderPageObjects({
      component: <Footer />,
    });
  };

  const getFooterContainer = () => screen.getByTestId(FOOTER_CONTAINER_TEST_ID);

  const getFooterTitleLogo = () => screen.getByTestId(FOOTER_TITLE_TEST_ID);

  const getFooterCopyrightText = () =>
    screen.getByTestId(FOOTER_COPYRIGHT_TEXT_TEST_ID);

  const getFooterNavItem = () => screen.getAllByTestId(FOOTER_NAV_ITEM_TEST_ID);

  return {
    render,
    getFooterContainer,
    getFooterTitleLogo,
    getFooterCopyrightText,
    getFooterNavItem,
  };
};

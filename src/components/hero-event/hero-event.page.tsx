import { renderPageObjects } from "@/test-utils";
import { screen } from "@testing-library/react";
import { HeroEvent, HeroEventProps } from ".";

export const initialProps: HeroEventProps = {
  event: {
    name: "Hero Event",
    description: "Hero Event Description",
    time: "00:00",
    image: "/assets/images/banner-vertical.svg",
    date: "00/00/0000",
    address: {
      street: "Rua do Chafariz",
      number: 28,
      city: "Paulo dos Ferros",
      state: "RN",
    },
  },
};

const HERO_EVENT_CONTAINER_TEST_ID = "hero-event-container";
const HERO_EVENT_IMAGE_TEST_ID = "hero-event-image";
const HERO_EVENT_NAME_TEST_ID = "hero-event-name";
const HERO_EVENT_DESCRIPTION_TEST_ID = "hero-event-description";
const HERO_EVENT_TIME_TEST_ID = "hero-event-time";
const HERO_EVENT_ADDRESS_TEST_ID = "hero-event-address";
const HERO_EVENT_BUTTON_TEST_ID = "hero-event-buy-button";

export const HeroEventPageObjects = (props: HeroEventProps) => {
  const render = (props = initialProps) => {
    return renderPageObjects({
      component: <HeroEvent {...props} />,
    });
  };

  const getHeroEventContainer = () =>
    screen.getByTestId(HERO_EVENT_CONTAINER_TEST_ID);

  const getHeroEventImage = () => screen.getByTestId(HERO_EVENT_IMAGE_TEST_ID);

  const getHeroEventName = () => screen.getByTestId(HERO_EVENT_NAME_TEST_ID);

  const getHeroEventDescription = () =>
    screen.getByTestId(HERO_EVENT_DESCRIPTION_TEST_ID);

  const getHeroEventTime = () => screen.getByTestId(HERO_EVENT_TIME_TEST_ID);

  const getHeroEventAddress = () =>
    screen.getByTestId(HERO_EVENT_ADDRESS_TEST_ID);

  const getHeroEventButton = () =>
    screen.getByTestId(HERO_EVENT_BUTTON_TEST_ID);

  return {
    render,
    getHeroEventContainer,
    getHeroEventImage,
    getHeroEventName,
    getHeroEventDescription,
    getHeroEventTime,
    getHeroEventAddress,
    getHeroEventButton,
  };
};

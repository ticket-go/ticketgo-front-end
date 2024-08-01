import { renderPageObjects } from "@/test-utils";
import { screen } from "@testing-library/react";
import { EventCard, EventCardProps } from ".";

const EVENT_CARD_CONTAINER_TEST_ID = "event-card-container";
const EVENT_CARD_TITLE_TEST_ID = "event-card-title";
const EVENT_CARD_DATE_HOUR_TEST_ID = "event-card-date-hour";
const EVENT_CARD_LOCATION_TEST_ID = "event-card-location";
const EVENT_CARD_BUTTON_TEST_ID = "event-card-button";

export const initialProps: EventCardProps = {
  title: "Festival",
  image: "/assets/images/image.png",
  date: "June 15, 2024",
  hour: "19:00",
  location: "Serrinha dos Pintos",
};

export const EventCardPageObjects = (props: EventCardProps) => {
  const render = (otherProps = initialProps) => {
    return renderPageObjects({
      component: <EventCard {...props} {...otherProps} />,
    });
  };

  const getEventCardContainer = () =>
    screen.getByTestId(EVENT_CARD_CONTAINER_TEST_ID);

  const getEventCardTitle = () => screen.getByTestId(EVENT_CARD_TITLE_TEST_ID);

  const getEventCardDateHour = () =>
    screen.getAllByTestId(EVENT_CARD_DATE_HOUR_TEST_ID);

  const getEventCardLocation = () =>
    screen.getByTestId(EVENT_CARD_LOCATION_TEST_ID);

  const getEventCardButton = () =>
    screen.getByTestId(EVENT_CARD_BUTTON_TEST_ID);

  return {
    render,
    getEventCardContainer,
    getEventCardTitle,
    getEventCardDateHour,
    getEventCardLocation,
    getEventCardButton,
  };
};

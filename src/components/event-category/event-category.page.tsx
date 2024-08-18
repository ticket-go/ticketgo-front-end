import { renderPageObjects } from "@/test-utils";
import { screen } from "@testing-library/react";
import { EventCategory, EventCategoryProps } from ".";

export const initialProps: EventCategoryProps = {
  event: {
    category: "music",
    category_display: "Música",
  },
};

const EVENT_CATEGORY_CONTAINER_TEST_ID = "event-category-container";
const EVENT_CATEGORY_IMAGE_TEST_ID = "event-category-image";
const EVENT_CATEGORY_NAME_TEST_ID = "event-category-name";

export const EventCategoryPageObjects = (props: EventCategoryProps) => {
  const render = (props = initialProps) => {
    return renderPageObjects({
      component: <EventCategory {...props} />,
    });
  };

  const getEventCategoryContainer = () =>
    screen.getByTestId(EVENT_CATEGORY_CONTAINER_TEST_ID);

  const getEventCategoryImage = () =>
    screen.getByTestId(EVENT_CATEGORY_IMAGE_TEST_ID);

  const getEventCategoryName = () =>
    screen.getByTestId(EVENT_CATEGORY_NAME_TEST_ID);

  return {
    render,
    getEventCategoryContainer,
    getEventCategoryImage,
    getEventCategoryName,
  };
};

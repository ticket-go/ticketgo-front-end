import { useState, useCallback, useEffect } from "react";
import { CarouselApi } from "../ui/carousel";

interface UseCarouselProps {
  totalItems: number;
  itemsPerPage: number;
  loop?: boolean;
  getMore?: () => Promise<void>;
  isLoading?: boolean;
}

interface UseCarouselReturn {
  current: number;
  count: number;
  carouselApi?: CarouselApi;
  setCarouselApi: (api: CarouselApi) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
}

export function useCarousel({
  totalItems,
  itemsPerPage,
  loop = true,
  getMore,
  isLoading,
}: UseCarouselProps): UseCarouselReturn {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = useCallback(() => {
    if (carouselApi) {
      carouselApi.scrollNext();
      setCurrent((prev) => Math.min(prev + 1, totalPages - 1));
    }
  }, [carouselApi, totalPages]);

  const previousPage = useCallback(() => {
    if (carouselApi) {
      carouselApi.scrollPrev();
      setCurrent((prev) => Math.max(prev - 1, 0));
    }
  }, [carouselApi]);

  const goToPage = useCallback(
    (page: number) => {
      if (carouselApi) {
        carouselApi.scrollTo(page);
        setCurrent(Math.min(Math.max(page, 0), totalPages - 1));
      }
    },
    [carouselApi, totalPages]
  );

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi, totalPages]);

  useEffect(() => {
    if (!carouselApi) return;

    const viewThreshold = 3;
    const lastSlide = carouselApi.slideNodes().length - viewThreshold;
    const isLastSlide = carouselApi.slidesInView().includes(lastSlide);
    const shouldGetMore = isLastSlide && !loop && !isLoading;

    if (getMore && shouldGetMore) {
      getMore();
      carouselApi.reInit();
    }
  }, [current, count, loop, getMore, carouselApi, isLoading]);

  return {
    setCarouselApi,
    current,
    count,
    carouselApi,
    nextPage,
    previousPage,
    goToPage,
  };
}

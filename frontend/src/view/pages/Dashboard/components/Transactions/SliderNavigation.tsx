import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

export function SliderNavigation() {
  const swiper = useSwiper();

  return (
    <div>
      <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-100 to-transparent w-12 h-12 flex items-center justify-center z-10">
        <ChevronLeftIcon
          className="text-gray-800 w-6 h-6 "
          onClick={() => swiper.slidePrev()}
        />
      </button>

      <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-gray-100 to-transparent w-12 h-12 flex items-center justify-center z-10">
        <ChevronRightIcon
          className="text-gray-800 w-6 h-6 "
          onClick={() => swiper.slideNext()}
        />
      </button>
    </div>
  );
}

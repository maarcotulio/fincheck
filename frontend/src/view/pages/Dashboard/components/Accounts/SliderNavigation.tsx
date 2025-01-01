import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

interface SliderNavigation {
  isBeginning: boolean;
  isEnd: boolean;
}

export function SliderNavigation({ isBeginning, isEnd }: SliderNavigation) {
  const swiper = useSwiper();

  return (
    <div>
      <button
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        disabled={isBeginning}
      >
        <ChevronLeftIcon
          className="text-white w-6 h-6 "
          onClick={() => swiper.slidePrev()}
        />
      </button>

      <button
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        disabled={isEnd}
      >
        <ChevronRightIcon
          className="text-white w-6 h-6"
          onClick={() => swiper.slideNext()}
        />
      </button>
    </div>
  );
}

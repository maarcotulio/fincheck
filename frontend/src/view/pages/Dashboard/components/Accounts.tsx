import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";

export function Accounts() {
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <span className="tracking-[-0.5px] text-white block">Saldo Total</span>
      <div className="flex items-center gap-2">
        <strong className="text-2xl tracking-[-1px] text-white">
          R$1000,00
        </strong>

        <button className="w-8 h-8 flex items-center justify-center">
          <EyeIcon open />
        </button>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper spaceBetween={16} slidesPerView={2.2}>
            <div
              className="flex items-center justify-between mb-4"
              slot="container-start"
            >
              <strong className="text-white tracking-[-1px] text-lg font-bold">
                Minhas contas
              </strong>

              <AccountsSliderNavigation />
            </div>

            <SwiperSlide>
              <AccountCard
                type="CASH"
                balance={123}
                name="Nubank"
                color="#7950F2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                type="CASH"
                balance={123}
                name="Nubank"
                color="#7950F2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                type="CASH"
                balance={123}
                name="Nubank"
                color="#7950F2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <AccountCard
                type="CASH"
                balance={123}
                name="Nubank"
                color="#7950F2"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

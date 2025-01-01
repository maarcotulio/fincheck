import { ChevronDownIcon } from "@radix-ui/react-icons";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useTransactionController } from "./useTransactionsController";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import emptyStateImage from "../../../../../assets/images/empty-state.svg";

export function Transactions() {
  const { areValuesVisible, isInitialLoading, isLoading, transactions } =
    useTransactionController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <header>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2">
                <TransactionsIcon />
                <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
                  Transações
                </span>
                <ChevronDownIcon className="text-gray-900" />
              </button>

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper slidesPerView={3} centeredSlides>
                <SliderNavigation />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1">
            {isLoading && (
              <div className="flex flex-col items-center h-full justify-center">
                <Spinner />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col items-center h-full justify-center">
                <img src={emptyStateImage} alt="Empty State" />
                <p className="text-gray-700 mt-4">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 ">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="expense" />

                    <div>
                      <strong className="block font-bold tracking-[-0.5]">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "tracking-[-0,5px] text-red-800 font-medium",
                      !areValuesVisible && "blur-sm"
                    )}
                  >
                    -{formatCurrency(500)}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 ">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="income" />

                    <div>
                      <strong className="block font-bold tracking-[-0.5]">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "tracking-[-0,5px] text-green-800 font-medium",
                      !areValuesVisible && "blur-sm"
                    )}
                  >
                    -{formatCurrency(500)}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

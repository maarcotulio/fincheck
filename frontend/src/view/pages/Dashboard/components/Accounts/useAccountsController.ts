import { useMemo, useState } from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isPending } = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce(
      (total, account) => total + account.currentBalance,
      0
    );
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    toggleValuesVisibility,
    areValuesVisible,
    isLoading: isPending,
    accounts,
    openNewAccountModal,
    currentBalance,
  };
}

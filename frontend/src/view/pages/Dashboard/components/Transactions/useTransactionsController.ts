import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionController() {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [],
  };
}

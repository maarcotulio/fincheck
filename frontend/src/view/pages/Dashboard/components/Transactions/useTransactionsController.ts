import { useEffect, useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { TransactionsFilters } from "../../../../../app/services/transactionsService/getAll";
import { Transaction } from "../../../../../app/entities/Transaction";

export function useTransactionController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<null | Transaction>(null);

  const { transactions, isLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleApplyFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters("bankAccountId")(bankAccountId);
    handleChangeFilters("year")(year);
    setIsFiltersModalOpen(false);
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true);
    setTransactionBeingEdited(transaction);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setTransactionBeingEdited(null);
  }

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    handleApplyFilters,
    filters,
    isEditModalOpen,
    transactionBeingEdited,
    handleOpenEditModal,
    handleCloseEditModal,
  };
}

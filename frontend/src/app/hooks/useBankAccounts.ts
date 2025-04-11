import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../services/bankAccountsService";

export function useBankAccounts() {
  const { data, isPending } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: bankAccountsService.getAll,
    staleTime: Infinity,
  });

  return {
    accounts: data ?? [],
    isPending,
  };
}

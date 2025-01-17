import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { CreateTransactionParams } from "../../../../../app/services/transactionsService/create";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  value: z.string().nonempty("Informe o valor"),
  name: z.string().nonempty("Informe o nome"),
  categoryId: z.string().nonempty("Informe a categoria"),
  bankAccounntId: z.string().nonempty("Informe a categoria"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    handleSubmit: hookFormSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { isPending, mutateAsync, reset } = useMutation({
    mutationFn: (params: CreateTransactionParams) =>
      transactionsService.create(params),
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        bankAccountId: data.bankAccounntId,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["transaction"] });
      toast.success("Transação cadastrada com sucesso!");
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error("Erro ao cadastrar a transação!");
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType
    );
  }, [categoriesList, newTransactionType]);

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    control,
    handleSubmit,
    errors,
    accounts,
    categories,
    isLoading: isPending,
  };
}

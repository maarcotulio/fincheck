import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { Transaction } from "../../../../../app/entities/Transaction";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { UpdateTransactionParams } from "../../../../../app/services/transactionsService/update";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const schema = z.object({
  value: z.union([z.string().nonempty("Informe o valor"), z.number()]),
  name: z.string().nonempty("Informe o nome"),
  categoryId: z.string().nonempty("Informe a categoria"),
  bankAccounntId: z.string().nonempty("Informe a categoria"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    handleSubmit: hookFormSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccounntId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();
  const { isPending, mutateAsync: updateTransaction } = useMutation({
    mutationFn: (params: UpdateTransactionParams) =>
      transactionsService.update(params),
  });
  const { isPending: isLoadingRemove, mutateAsync: removeTransaction } =
    useMutation({
      mutationFn: (params: string) => transactionsService.remove(params),
    });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        bankAccountId: data.bankAccounntId,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });

      toast.success(
        transaction!.type === "EXPENSE"
          ? "Despesa editada com sucesso!"
          : "Receita editada com sucesso!"
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === "EXPENSE"
          ? "Erro ao salvar a despesa!"
          : "Erro ao salvar a receita!"
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction!.type
    );
  }, [categoriesList, transaction]);

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Transação foi deletada com sucesso!");
      onClose();
    } catch {
      toast.error("Erro ao deletar a transação!");
    }
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  return {
    register,
    control,
    handleSubmit,
    errors,
    accounts,
    categories,
    isLoading: isPending,
    isDeleteModalOpen,
    isLoadingDelete: isLoadingRemove,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    handleOpenDeleteModal,
  };
}

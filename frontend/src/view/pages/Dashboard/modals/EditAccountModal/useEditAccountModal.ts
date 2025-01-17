import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { UpdateBankAccountParam } from "../../../../../app/services/bankAccountsService/update";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo Inicial é obrigatório"),
    z.number(),
  ]),
  name: z.string().nonempty("Nome da Conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModal() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();
  const {
    handleSubmit: hookFormSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync: updateAccount } = useMutation({
    mutationFn: (params: UpdateBankAccountParam) =>
      bankAccountsService.update(params),
  });
  const { isPending: isLoadingRemove, mutateAsync: removeAccount } =
    useMutation({
      mutationFn: (params: string) => bankAccountsService.remove(params),
    });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta foi editada com sucesso!");
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao salvar as alterações!");
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }
  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta foi deletada com sucesso!");
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao deletar a conta!");
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading: isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingRemove,
  };
}

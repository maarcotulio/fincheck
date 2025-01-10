import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { BankAccountParam } from "../../../../../app/services/bankAccountsService/create";

const schema = z.object({
  initialBalance: z.string().nonempty("Saldo Inicial é obrigatório"),
  name: z.string().nonempty("Nome da Conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal } = useDashboard();
  const {
    handleSubmit: hookFormSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (params: BankAccountParam) =>
      bankAccountsService.create(params),
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      closeEditAccountModal();
      toast.success("Conta foi cadastrada com sucesso!");
      reset({
        initialBalance: "0",
        name: "",
        type: "CHECKING",
        color: "",
      });
    } catch {
      toast.error("Erro ao cadastrar a conta!");
    }
  });

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading: isPending,
  };
}

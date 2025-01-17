import { httpClient } from "../httpClient";

export interface UpdateBankAccountParam {
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: "CHECKING" | "INVESTMENT" | "CASH";
}

export async function update({ id, ...params }: UpdateBankAccountParam) {
  const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

  return data;
}

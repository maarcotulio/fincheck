import { httpClient } from "../httpClient";

export interface BankAccountParam {
  name: string;
  initialBalance: number;
  color: string;
  type: "CHECKING" | "INVESTMENT" | "CASH";
}

export async function create(params: BankAccountParam) {
  const { data } = await httpClient.post("/bank-accounts", params);

  return data;
}

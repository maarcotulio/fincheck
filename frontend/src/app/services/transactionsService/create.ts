import { httpClient } from "../httpClient";

export interface CreateTransactionParams {
  categoryId: string;
  bankAccountId: string;
  name: string;
  value: number;
  date: string;
  type: "INCOME" | "EXPENSE";
}

export async function create(params: CreateTransactionParams) {
  const { data } = await httpClient.post("/transactions", params);

  return data;
}

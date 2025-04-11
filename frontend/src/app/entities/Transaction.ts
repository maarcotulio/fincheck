export interface Transaction {
  id: string;
  name: string;
  value: number;
  categoryId: string;
  date: string;
  bankAccountId: string;
  type: "INCOME" | "EXPENSE";
  category?: {
    id: string;
    name: string;
    icon: string;
  };
}

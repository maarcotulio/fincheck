import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../components/icons/BankAccountTypeIcon";

interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: "CASH" | "INVESTMENT" | "CHECKING";
}

export function AccountCard({ color, name, balance, type }: AccountCardProps) {
  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
    >
      <div>
        <BankAccountTypeIcon type={type} />
        <span className="text-gray-500 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>
      <div>
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {formatCurrency(balance)}
        </span>
        <small className="text-sm text-gray-600">Saldo Atual</small>
      </div>
    </div>
  );
}

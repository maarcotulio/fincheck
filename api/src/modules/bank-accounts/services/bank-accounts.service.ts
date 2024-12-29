import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBankAccountDto } from "../dto/create-bank-account.dto";
import { UpdateBankAccountDto } from "../dto/update-bank-account.dto";
import { BankAccountsRepository } from "src/shared/database/repositories/bank-accounts.repositories";
import { ValidateBankAccountOwnershipService } from "./validate-bank-account-ownership.service";

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto;

    return this.bankAccountsRepo.create({
      data: {
        userId,
        name,
        initialBalance,
        color,
        type,
      },
    });
  }

  async findByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findAll({
      where: {
        userId,
      },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactionsValue = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === "INCOME"
            ? transaction.value
            : -transaction.value),
        0
      );

      const currentBalance =
        bankAccount.initialBalance + totalTransactionsValue;

      return {
        ...bankAccount,
        currentBalance,
        transactions,
      };
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId
    );

    const { color, initialBalance, name, type } = updateBankAccountDto;

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        userId,
        name,
        initialBalance,
        color,
        type,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId
    );

    await this.bankAccountsRepo.remove({
      where: {
        id: bankAccountId,
        userId,
      },
    });

    return null;
  }
}

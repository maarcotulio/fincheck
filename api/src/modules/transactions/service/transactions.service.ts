import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { UpdateTransactionDto } from "../dto/update-transaction.dto";
import { TransactionsRepository } from "src/shared/database/repositories/transactions.repositories";
import { ValidateBankAccountOwnershipService } from "../../bank-accounts/services/validate-bank-account-ownership.service";
import { ValidateCategoryOwnershipService } from "./validate-category-ownership.service";
import { ValidateTransactionOwnershipService } from "./validate-transaction-ownership.service";
import { filter } from "rxjs";
import { TransactionType } from "../entities/Transaction";

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepo: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } =
      createTransactionDto;

    await this.validateEntitiesOwnership({ userId, bankAccountId, categoryId });

    return this.transactionRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    }
  ) {
    return this.transactionRepo.findAll({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto
  ) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;
    await this.validateEntitiesOwnership({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });

    return this.transactionRepo.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnership({
      userId,
      transactionId,
    });

    await this.transactionRepo.remove({
      where: { id: transactionId },
    });

    return null;
  }

  private async validateEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId
        ),
      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId),
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId
        ),
    ]);
  }
}

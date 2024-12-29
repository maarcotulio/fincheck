import { Injectable } from "@nestjs/common";
import { type Prisma } from "@prisma/client";
import { PrismaService } from "src/shared/database/prisma.service";

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(findAllDto: Prisma.TransactionFindManyArgs) {
    return this.prismaService.transaction.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.TransactionFindFirstArgs) {
    return this.prismaService.transaction.findFirst(findFirstDto);
  }

  create(createDto: Prisma.TransactionCreateArgs) {
    return this.prismaService.transaction.create(createDto);
  }

  update(updateDto: Prisma.TransactionUpdateArgs) {
    return this.prismaService.transaction.update(updateDto);
  }

  remove(removeDto: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(removeDto);
  }
}

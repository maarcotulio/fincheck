import { Injectable } from "@nestjs/common";
import { type Prisma } from "@prisma/client";
import { PrismaService } from "src/shared/database/prisma.service";

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll<T extends Prisma.BankAccountFindManyArgs>(
    findAllDto: Prisma.SelectSubset<T, Prisma.BankAccountFindManyArgs>
  ) {
    return this.prismaService.bankAccount.findMany(findAllDto);
  }

  findFirst(findFirstDto: Prisma.BankAccountFindFirstArgs) {
    return this.prismaService.bankAccount.findFirst(findFirstDto);
  }

  create(createDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createDto);
  }

  update(updateDto: Prisma.BankAccountUpdateArgs) {
    return this.prismaService.bankAccount.update(updateDto);
  }

  remove(removeDto: Prisma.BankAccountDeleteArgs) {
    return this.prismaService.bankAccount.delete(removeDto);
  }
}

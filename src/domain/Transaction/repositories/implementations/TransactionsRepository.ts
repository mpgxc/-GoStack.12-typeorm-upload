/* eslint-disable no-param-reassign */
import { getRepository, Repository } from 'typeorm';

import { Transaction } from '../../../entities/Transaction';
import { ITransactionRepository, IBalance } from '../ITransactionRepository';

class TransactionsRepository implements ITransactionRepository {
  private readonly ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async getBalance(): Promise<IBalance> {
    const transactions = await this.find();

    return transactions.reduce(
      (result, items) => {
        if (items.type === 'income') {
          result.income += Number(items.value);
          result.total += Number(items.value);
        }
        if (items.type === 'outcome') {
          result.outcome += Number(items.value);
          result.total -= Number(items.value);
        }
        return result;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }
}

export { TransactionsRepository };

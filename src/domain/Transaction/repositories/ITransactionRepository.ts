export interface IBalance {
  income: number;
  outcome: number;
  total: number;
}

export interface ITransactionRepository {
  getBalance(): Promise<IBalance>;
}

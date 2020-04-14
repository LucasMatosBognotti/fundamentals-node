import Transaction from '../models/Transaction';

interface CreateTrasactionDTO {
  title: string;
  value: number;
  type: string; // 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[]; // <= Vai ser acessada do pelo metodos dantro da classe

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.getTotalIncome();
    const outcome = this.getTotalOutcome();
    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  private getTotalIncome(): number {
    return this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        return total + transaction.value;
      }
      return total;
    }, 0);
  }

  private getTotalOutcome(): number {
    return this.transactions.reduce((total, transaction) => {
      if (transaction.type === 'outcome') {
        return total + transaction.value;
      }
      return total;
    }, 0);
  }

  public create({ title, value, type }: CreateTrasactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

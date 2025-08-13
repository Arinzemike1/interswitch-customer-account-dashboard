export type AccountType = "Savings" | "Current" | "Loan" | "Overdraft";

export interface Account {
  id: number;
  type: AccountType;
  slug: string;
  number: string;
  balance: number;
  lastTransactionDate: string;
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
  type: "debit" | "credit";
  amount: number;
  balance: number;
}

export const accounts: Account[] = [
  {
    id: 1,
    type: "Savings",
    slug: "savings",
    number: "1029384756",
    balance: 10500.75,
    lastTransactionDate: "2025-08-05",
  },
  {
    id: 2,
    type: "Current",
    slug: "current",
    number: "9876543210",
    balance: 256000.0,
    lastTransactionDate: "2025-08-04",
  },
  {
    id: 3,
    type: "Loan",
    slug: "loan",
    number: "1234000056",
    balance: 7000.0,
    lastTransactionDate: "2025-07-30",
  },
  {
    id: 4,
    type: "Overdraft",
    slug: "overdraft",
    number: "0234983012",
    balance: 15000.0,
    lastTransactionDate: "2025-07-28",
  },
];

export const transactions: Record<string, Transaction[]> = {
  savings: [
    {
      id: 1,
      date: "2025-08-05",
      description: "Grocery Store",
      type: "debit",
      amount: 50.25,
      balance: 10500.75,
    },
    {
      id: 2,
      date: "2025-08-04",
      description: "Salary",
      type: "credit",
      amount: 2000.0,
      balance: 10551.0,
    },
    {
      id: 3,
      date: "2025-08-03",
      description: "Electricity Bill",
      type: "debit",
      amount: 120.5,
      balance: 8551.0,
    },
    {
      id: 4,
      date: "2025-08-01",
      description: "ATM Withdrawal",
      type: "debit",
      amount: 100.0,
      balance: 8671.5,
    },
    {
      id: 5,
      date: "2025-08-01",
      description: "Transfer to current",
      type: "credit",
      amount: 1000.0,
      balance: 9671.5,
    },
    {
      id: 6,
      date: "2025-08-01",
      description: "Transfer to loan",
      type: "credit",
      amount: 500.0,
      balance: 10171.5,
    },
    {
      id: 7,
      date: "2025-08-01",
      description: "Transfer to overdraft",
      type: "credit",
      amount: 200.0,
      balance: 10371.5,
    },
  ],
  current: [
    {
      id: 5,
      date: "2025-08-04",
      description: "Transfer from savings",
      type: "credit",
      amount: 2000.0,
      balance: 256000.0,
    },
    {
      id: 6,
      date: "2025-08-02",
      description: "POS Purchase",
      type: "debit",
      amount: 450.0,
      balance: 254000.0,
    },
    {
      id: 7,
      date: "2025-07-30",
      description: "Salary",
      type: "credit",
      amount: 50000.0,
      balance: 254450.0,
    },
  ],
  loan: [
    {
      id: 8,
      date: "2025-07-30",
      description: "Loan disbursement",
      type: "credit",
      amount: 5000.0,
      balance: 12000.0,
    },
  ],
  overdraft: [
    {
      id: 9,
      date: "2025-07-28",
      description: "Overdraft disbursement",
      type: "credit",
      amount: 15000.0,
      balance: 25000.0,
    },
    {
      id: 10,
      date: "2025-07-27",
      description: "Transfer to savings",
      type: "debit",
      amount: 5000.0,
      balance: 20000.0,
    },
  ],
};

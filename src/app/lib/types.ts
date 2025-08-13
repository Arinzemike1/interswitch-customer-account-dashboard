export type LoginFormValues = {
  email: string;
  password: string;
};

export type Transaction = {
  id: number;
  date: string;
  description: string;
  type: "debit" | "credit";
  amount: number;
  balance: number;
};

export type TransferFormValues = {
  sourceAccountId: string;
  beneficiaryAccountNumber: string;
  amount: number;
  description?: string;
};

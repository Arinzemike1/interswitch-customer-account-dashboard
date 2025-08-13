export type LoginFormValues = {
  email: string;
  password: string;
};

export type TransferFormValues = {
  sourceAccountId: string;
  beneficiaryAccountNumber: string;
  amount: number;
  description?: string;
};

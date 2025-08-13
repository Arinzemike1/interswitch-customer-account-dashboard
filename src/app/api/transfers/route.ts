import { NextResponse } from "next/server";
import { accounts, transactions, Account } from "../../lib/mock-data";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    sourceAccountId,
    beneficiaryAccountNumber,
    amount,
    description,
  } = body;
  if (!sourceAccountId || !beneficiaryAccountNumber || !amount) {
    return NextResponse.json(
      { error: "Required fields missing" },
      { status: 400 },
    );
  }
  const sourceTxs = transactions[sourceAccountId] ?? [];
  const sourceAcc = accounts.find((a: Account) => a.slug === sourceAccountId);
  if (!sourceAcc) {
    return NextResponse.json(
      { error: "Invalid source account" },
      { status: 404 },
    );
  }
  const numericAmount = Number(amount);
  // Calculate new balance by subtracting the transfer amount from the last known balance.
  const lastBalance = sourceTxs.length > 0 ? sourceTxs[0].balance : sourceAcc.balance;
  const newBalance = lastBalance - numericAmount;
  // Create a new transaction object for the debit.
  const newTransaction = {
    id: Date.now(),
    date: new Date().toISOString().split("T")[0],
    description: description || "Funds transfer",
    type: "debit" as const,
    amount: numericAmount,
    balance: newBalance,
  };
  // Prepend new transaction to the list.
  transactions[sourceAccountId] = [newTransaction, ...sourceTxs];
  // Update account's last transaction date and balance.
  sourceAcc.lastTransactionDate = newTransaction.date;
  sourceAcc.balance = newBalance;
  return NextResponse.json({ success: true, transaction: newTransaction });
}
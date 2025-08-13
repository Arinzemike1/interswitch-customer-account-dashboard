import { Transaction } from "./types";

export const formatAmount = (amount: string | number | undefined) => {
  return `₦${amount?.toLocaleString()}`;
};

export const removeCommasFromValue = (value: string) => {
  return value?.replace(/,/g, "");
};

export const exportCsv = (filtered: Transaction[], slug: string) => {
  const headers = ["Date", "Description", "Type", "Amount", "Balance"];
  const rows = filtered.map((tx) => [
    tx.date,
    tx.description,
    tx.type,
    tx.amount.toString(),
    tx.balance.toString(),
  ]);
  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transactions-${slug}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

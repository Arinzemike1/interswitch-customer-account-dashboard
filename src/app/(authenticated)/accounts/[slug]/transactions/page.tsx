"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getAccountTransactions } from "@/app/services/transactions";
import Icon from "@/app/components/Icons/Icon";
import Button from "@/app/components/Button";
import Table from "@/app/components/Table";
import Loader from "@/app/components/Loader";
import { formatAmount, exportCsv } from "@/app/lib/utils";
import { Transaction } from "@/app/lib/types";

export default function TransactionHistory() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getAccountTransactions(slug),
    retry: false,
  });

  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [search, setSearch] = useState("");

  const transactionsData: Transaction[] = transactions?.data ?? [];

  const filtered = transactionsData.filter((tx) => {
    const term = search.toLowerCase();
    return (
      tx.description.toLowerCase().includes(term) ||
      tx.date.toLowerCase().includes(term) ||
      tx.type.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageStart = (page - 1) * pageSize;
  const pageData = filtered.slice(pageStart, pageStart + pageSize);

  const columns = ["Date", "Description", "Type", "Amount", "Balance After"];

  return (
    <main className="p-4">
      <Icon
        name="arrow-left"
        className="cursor-pointer"
        onClick={() => router.back()}
      />
      <div className="flex flex-wrap gap-5 items-center justify-between mt-10 mb-4">
        <h1 className="text-xl font-bold">Transactions</h1>
        <div className="flex gap-3">
          <Link href="/accounts/transfer">
            <Button className="flex gap-1 items-center" primary>
              <Icon name="arrow-up-right" />
              Transfer Funds
            </Button>
          </Link>

          <Button
            className="flex gap-1 items-center"
            onClick={() => exportCsv(filtered, slug)}
            plain
          >
            <Icon name="export" />
            Export
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by date, description or type"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="rounded-lg w-full md:w-[300px] text-sm bg-transparent box-border placeholder:text-sm font-medium placeholder:tracking-normal placeholder:text-[#999] outline-none focus:border-primary px-5 h-11 border-all"
        />
      </div>
      {isLoading && <Loader />}
      {transactions && (
        <Table columns={columns} className="mb-4">
          {pageData.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="p-5 whitespace-nowrap">{tx.date}</td>
              <td className="p-5 whitespace-nowrap">{tx.description}</td>
              <td className="p-5 whitespace-nowrap capitalize">{tx.type}</td>
              <td
                className={`p-5 whitespace-nowrap ${
                  tx.type === "debit" ? "text-red-600" : "text-green-600"
                }`}
              >
                {formatAmount(tx.amount)}
              </td>
              <td className="p-5 whitespace-nowrap">
                {formatAmount(tx.balance)}
              </td>
            </tr>
          ))}
        </Table>
      )}
      {transactions && filtered.length > pageSize && (
        <div className="flex justify-between space-x-2 mt-4">
          <p>{`Total Records: ${filtered.length}`}</p>

          <div className="flex items-center space-x-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 cursor-pointer py-1 text-sm border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 text-sm py-1">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 cursor-pointer text-sm py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import SensitiveField from "../../components/SensitiveField";
import Table from "@/app/components/Table";
import Loader from "@/app/components/Loader";
import Select from "@/app/components/Select";
import { getAccounts } from "@/app/services/account";
import { formatAmount } from "@/app/lib/utils";
import Link from "next/link";
import Button from "@/app/components/Button";
import Icon from "@/app/components/Icons/Icon";

interface Account {
  id: string;
  type: string;
  slug: string;
  number: string;
  balance: number;
  lastTransactionDate: string;
}

export default function AccountOverview() {
  const router = useRouter();

  const { data: accounts, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
    retry: false,
  });

  const accountsData: Account[] = accounts?.data ?? [];

  const [filter, setFilter] = useState<string>("All");
  const [sortField, setSortField] = useState<
    "" | "balance" | "lastTransactionDate"
  >("");

  const filterOptions = ["All", "Savings", "Current", "Loan"];

  const filtered =
    accountsData?.filter(
      (acc: Account) => filter === "All" || acc.type === filter
    ) ?? [];
  const sorted = filtered.slice().sort((a: Account, b: Account) => {
    let comp = 0;
    if (sortField === "balance") {
      comp = a.balance - b.balance;
    } else {
      comp =
        new Date(a.lastTransactionDate).getTime() -
        new Date(b.lastTransactionDate).getTime();
    }
    return -comp;
  });

  const columns = [
    "Account Type",
    "Account Number",
    "Current Balance",
    "Last Transaction Date",
  ];

  return (
    <main className="flex-1 container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Account Overview</h1>
      {isLoading && <Loader />}
      {accounts && (
        <>
          <div className="flex flex-wrap justify-between gap-4 mb-4 mt-10">
            <div className="flex items-center gap-5">
              <Select
                className="border rounded p-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {filterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>

              <Select
                className="border rounded p-2"
                value={sortField}
                onChange={(e) =>
                  setSortField(
                    e.target.value as "balance" | "lastTransactionDate"
                  )
                }
              >
                <option value="">Sort By</option>
                <option value="balance">Current Balance</option>
                <option value="lastTransactionDate">Last transaction</option>
              </Select>
            </div>

            <Link href="/accounts/transfer">
              <Button className="flex gap-1 items-center" primary>
                <Icon name="arrow-up-right" />
                Transfer Funds
              </Button>
            </Link>
          </div>

          <Table columns={columns} className="mb-4">
            {sorted.map((account: Account) => (
              <tr
                key={account.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() =>
                  router.push(`/accounts/${account.slug}/transactions`)
                }
              >
                <td className="p-5 whitespace-nowrap">{account.type}</td>
                <td className="p-5 whitespace-nowrap">
                  <SensitiveField value={account.number} showLast={4} />
                </td>
                <td className="p-5 whitespace-nowrap">
                  {formatAmount(account.balance)}
                </td>
                <td className="p-5 whitespace-nowrap">
                  {account.lastTransactionDate}
                </td>
              </tr>
            ))}
          </Table>
        </>
      )}
    </main>
  );
}

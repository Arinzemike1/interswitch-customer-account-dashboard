"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import Modal from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import { transferMoney } from "../../../../services/transactions";
import { getAccounts } from "../../../../services/account";
import Icon from "../../../../components/Icons/Icon";
import { TransferFormValues } from "../../../../lib/types";
import { useState } from "react";
import { useFormik } from "formik";
import Button from "../../../../components/Button";
import { toast } from "sonner";
import Link from "next/link";
import { formatAmount } from "../../../../lib/utils";

interface Account {
  id: string;
  type: string;
  slug: string;
  number: string;
  balance: number;
  lastTransactionDate: string;
}

const transferSchema = Yup.object().shape({
  sourceAccountId: Yup.string().required("Source account is required"),
  beneficiaryAccountNumber: Yup.string()
    .matches(/^\d{10}$/, "Beneficiary account must be a 10 digit number")
    .required("Beneficiary account number is required"),
  amount: Yup.string().required("Amount is required"),
  description: Yup.string(),
});

const TransactionDetail = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between items-center border-b border-[#E7EBEE] py-5">
    <h3 className="font-semibold text-sm text-[#1B1D28]">{label}</h3>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

export default function TransferForm() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { data: accounts } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
    retry: false,
  });

  const accountsData: Account[] = accounts?.data ?? [];

  const formik = useFormik({
    initialValues: {
      sourceAccountId: slug || "",
      beneficiaryAccountNumber: "",
      amount: "",
      description: "",
    },
    validationSchema: transferSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: () => {
      setShowModal(true);
    },
  });

  const { sourceAccountId, beneficiaryAccountNumber, amount, description } =
    formik.values;

  const { isPending, mutate } = useMutation({
    mutationFn: (payload: TransferFormValues) => transferMoney(payload),
    onSuccess: () => {
      setShowSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("Error processing transfer");
    },
  });

  const handleConfirm = async () => {
    setShowModal(false);
    mutate({
      ...formik.values,
      amount: Number(amount),
    });
  };

  return (
    <>
      <Icon
        name="arrow-left"
        onClick={() => router.back()}
        className="cursor-pointer"
      />

      <div className="mx-auto p-4 max-w-lg mt-10">
        <h1 className="text-2xl font-bold mb-6">Funds Transfer</h1>

        <form onSubmit={formik.handleSubmit}>
          <Select
            className="!h-[50px]"
            label="Source Account"
            formik={formik}
            {...formik.getFieldProps("sourceAccountId")}
          >
            {accountsData.map((account) => (
              <option key={account.id} value={account.id}>
                {account.type} ({account.number})
              </option>
            ))}
          </Select>

          <Input
            type="text"
            label="Beneficiary account number"
            placeholder="Enter 10 digit account number"
            maxlength={10}
            formik={formik}
            {...formik.getFieldProps("beneficiaryAccountNumber")}
          />

          <Input
            type="tel"
            label="Amount"
            placeholder="Enter amount"
            formik={formik}
            {...formik.getFieldProps("amount")}
          />

          <Input
            type="text"
            label="Description (optional)"
            placeholder="Add a description"
            formik={formik}
            {...formik.getFieldProps("description")}
          />

          <Button
            className="w-full mt-5 h-[50px]"
            disabled={!formik.isValid || isPending}
            primary
          >
            Continue
          </Button>
        </form>

        <Modal
          isOpen={showModal}
          title="Confirm Transaction"
          subTitle="You're about to make a transfer"
          icon="warning"
        >
          <TransactionDetail label="Source Account" value={sourceAccountId} />
          <TransactionDetail
            label="Beneficiary Account"
            value={beneficiaryAccountNumber}
          />
          <TransactionDetail label="Amount" value={formatAmount(amount)} />

          {description && (
            <TransactionDetail label="Description" value={description} />
          )}

          <div className="flex justify-between items-center gap-10 mt-10">
            <Button plain onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button primary onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </Modal>

        <Modal
          isOpen={showSuccess}
          title="Transaction Successful"
          icon="success"
          subTitle={`You've just sent ${formatAmount(amount)} to
                ${beneficiaryAccountNumber}`}
        >
          <div className="flex justify-center">
            <Link href="/accounts">
              <Button type="button" className="mt-3" primary>
                Go to dashboard
              </Button>
            </Link>
          </div>
        </Modal>
      </div>
    </>
  );
}

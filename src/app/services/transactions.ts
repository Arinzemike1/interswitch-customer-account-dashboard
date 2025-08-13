import axios from "axios";
import { TransferFormValues } from "../lib/types";

export const getAccountTransactions = (slug: string) => {
  return axios.get(`/api/accounts/${slug}/transactions`);
};

export const transferMoney = (data: TransferFormValues) => {
  return axios.post("/api/transfers", data);
};

import axios from "axios";

export const getAccounts = () => {
  return axios.get("/api/accounts");
};

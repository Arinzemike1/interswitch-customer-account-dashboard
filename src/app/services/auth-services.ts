import axios from "axios";
import { LoginFormValues } from "../lib/types";

export const loginUser = (data: LoginFormValues) => {
  return axios.post("/api/login", data);
};

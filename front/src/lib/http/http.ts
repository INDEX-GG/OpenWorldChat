import axios from "axios";
import { API_URL, TIMEOUT } from "../constants/constants";

export const createApi = () => {
  return axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
  });
};

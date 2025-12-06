import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";

//! Get the token
const token = getUserFromStorage();
//! Add
export const addTransactionAPI = async ({
  type,
  category,
  date,
  description,
  amount,
}) => {
  const response = await axios.post(
    `${BASE_URL}/transactions/create`,
    {
      category,
      date,
      description,
      amount,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //Return a promise
  return response.data;
};
//! update
export const updateTransactionAPI = async ({ 
  type, 
  category, 
  date, 
  description, 
  amount, 
  id 
}) => {
  const response = await axios.put(
    `${BASE_URL}/transactions/update/${id}`,
    {
      category,
      date,
      description,
      amount,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //Return a promise
  return response.data;
};
//! delete
export const deleteTransactionAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/transactions/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};
//! lists
export const listTransactionsAPI = async (filters = {}) => {
  const { category, type, startDate, endDate } = filters;
  const response = await axios.get(`${BASE_URL}/transactions/lists`, {
    params: { category, endDate, startDate, type },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};
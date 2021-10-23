import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-tracker-server-smhong.herokuapp.com/api",
  // baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const getExpenses = () => api.get("/expenses");

export const addExpense = (expense) => api.post("/expenses", expense);

export const editExpense = (expense) =>
  api.patch(`/expenses/${expense._id}`, expense);

export const deleteExpense = (id) => api.delete(`/expenses/${id}`);

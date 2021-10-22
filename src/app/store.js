import { createStore, combineReducers } from "redux";
import { allExpensesReducer } from "../reducers/allExpensesSlice";
import { toBeExpensesReducer } from "../reducers/toBeExpensesSlice";

export const store = createStore(
  combineReducers({
    allExpenses: allExpensesReducer,
    toBeExpenses: toBeExpensesReducer,
  })
);

import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { allExpensesReducer } from "../reducers/allExpensesSlice";
import { apiStatusReducer } from "../reducers/apiStatusSlice";
import { toBeExpensesReducer } from "../reducers/toBeExpensesSlice";

// Redux store with thunk
export const store = createStore(
  combineReducers({
    allExpenses: allExpensesReducer,
    toBeExpenses: toBeExpensesReducer,
    apiStatus: apiStatusReducer,
  }),
  applyMiddleware(reduxThunk)
);

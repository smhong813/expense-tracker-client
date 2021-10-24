import * as api from "../api/api";
import * as dateUtils from "../utils/date";
import {
  apiAddExpense,
  apiAddExpenseFail,
  apiAddExpenseSuccess,
  apiDeleteExpense,
  apiDeleteExpenseFail,
  apiDeleteExpenseSuccess,
  apiEditExpense,
  apiEditExpenseFail,
  apiEditExpenseSuccess,
  apiGetExpenses,
  apiGetExpensesFail,
  apiGetExpensesSuccess,
} from "./apiStatusSlice";
import { deleteToBeExpense } from "./toBeExpensesSlice";

// Error messsage for handling an unexpected error from the server (user-friendly)
const GLOBAL_ERROR_MESSAGE = "Something went wrong. Please try again later.";

const initialState = [];
/**
 * Reducer for managing expenses from the server, and performing adding, updating and deleting an expense
 *
 * @param {object[]} allExpenses
 * @param {object} action
 * @returns
 */
export const allExpensesReducer = (allExpenses = initialState, action) => {
  switch (action.type) {
    case "allExpenses/loadExpenses":
      return [...action.payload];
    case "allExpenses/addExpense":
      return [...allExpenses, action.payload];
    case "allExpenses/editExpense":
      return allExpenses.map((item) =>
        item._id !== action.payload._id ? item : action.payload
      );
    case "allExpenses/deleteExpense":
      return allExpenses.filter((item) => item._id !== action.payload);
    case "allExpenses/changeModeToEdit": // When the "Edit" button clicked
      return allExpenses.map((item) =>
        item._id !== action.payload._id
          ? item
          : {
              ...item,
              mode: "edit",
            }
      );
    case "allExpenses/changeModeToNormal": // When the "Cancel" button clicked
      return allExpenses.map((item) =>
        item._id !== action.payload._id
          ? item
          : {
              ...item,
              mode: "normal",
            }
      );
    default:
      return allExpenses;
  }
};

// Load all expenses from the server
export const loadExpenses = () => async (dispatch, getState) => {
  try {
    dispatch(apiGetExpenses()); // set loading to true, error to none
    const { data } = await api.getExpenses(); // call the API
    dispatch(apiGetExpensesSuccess()); // set loading to false, error to none
    dispatch({
      // set the data from the server to allExpenses, at this time set its mode to normal(for a display), date to YYYY-MM-DD(for displaying the date on the input tag with date type)
      type: "allExpenses/loadExpenses",
      payload: data.map((item) => {
        return {
          ...item,
          mode: "normal",
          date: dateUtils.get4Y2M2D(item.date),
        };
      }),
    });
  } catch (err) {
    if (err.response) {
      // Expected error which means an error that the server know
      dispatch(apiGetExpensesFail(err.response.data.error));
    } else {
      // Error that the server doesn't know. i.e. Connection error
      dispatch(apiGetExpensesFail({ message: GLOBAL_ERROR_MESSAGE }));
    }
  }
};

// The others work as the above works
// Add a new expense to the server
export const addExpense = (expense) => async (dispatch, getState) => {
  try {
    const toBeExpense = Object.assign({}, expense);
    delete expense._id;
    dispatch(apiAddExpense());
    const { data } = await api.addExpense(expense);
    dispatch(deleteToBeExpense(toBeExpense));
    dispatch({
      type: "allExpenses/addExpense",
      payload: {
        ...data,
        mode: "normal",
        date: dateUtils.get4Y2M2D(data.date),
      },
    });
    dispatch(apiAddExpenseSuccess());
  } catch (err) {
    if (err.response) {
      dispatch(apiAddExpenseFail(err.response.data.error));
    } else {
      dispatch(apiAddExpenseFail({ message: GLOBAL_ERROR_MESSAGE }));
    }
  }
};
// Update an expense
export const editExpense = (expense) => async (dispatch, getState) => {
  try {
    dispatch(apiEditExpense());
    const { data } = await api.editExpense(expense);
    dispatch({
      type: "allExpenses/editExpense",
      payload: {
        ...data,
        mode: "normal",
        date: dateUtils.get4Y2M2D(data.date),
      },
    });
    dispatch(apiEditExpenseSuccess());
  } catch (err) {
    if (err.response) {
      dispatch(apiEditExpenseFail(err.response.data.error));
    } else {
      dispatch(apiEditExpenseFail({ message: GLOBAL_ERROR_MESSAGE }));
    }
  }
};
// Delete an expense
export const deleteExpense = (id) => async (dispatch, getState) => {
  try {
    dispatch(apiDeleteExpense());
    await api.deleteExpense(id);
    dispatch({
      type: "allExpenses/deleteExpense",
      payload: id,
    });
    dispatch(apiDeleteExpenseSuccess());
  } catch (err) {
    if (err.response) {
      dispatch(apiDeleteExpenseFail(err.response.data.error));
    } else {
      dispatch(apiDeleteExpenseFail({ message: GLOBAL_ERROR_MESSAGE }));
    }
  }
};

export function changeModeToEdit(expense) {
  return {
    type: "allExpenses/changeModeToEdit",
    payload: expense,
  };
}

export function changeModeToNormal(expense) {
  return {
    type: "allExpenses/changeModeToNormal",
    payload: expense,
  };
}

// Items in the list remain sorted: The newest locates at the top
const sortByDateDesc = (a, b) => new Date(b.date) - new Date(a.date);
export const selectAllExpenses = (state) =>
  [...state.allExpenses].sort(sortByDateDesc);

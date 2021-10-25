const initialState = {
  getExpenses: {
    loading: false,
    error: "",
  },
  addExpense: {
    loading: false,
    error: "",
  },
  editExpense: {
    loading: false,
    error: "",
  },
  deleteExpense: {
    loading: false,
    error: "",
  },
};

export const API_GET_EXPENSES = "apiStatus/getExpenses";
export const API_GET_EXPENSES_SUCCESS = "apiStatus/getExpenses/success";
export const API_GET_EXPENSES_FAIL = "apiStatus/getExpenses/fail";

export const API_ADD_EXPENSE = "apiStatus/addExpense";
export const API_ADD_EXPENSE_SUCCESS = "apiStatus/addExpense/success";
export const API_ADD_EXPENSE_FAIL = "apiStatus/addExpense/fail";

export const API_EDIT_EXPENSE = "apiStatus/editExpense";
export const API_EDIT_EXPENSE_SUCCESS = "apiStatus/editExpense/success";
export const API_EDIT_EXPENSE_FAIL = "apiStatus/editExpense/fail";

export const API_DELETE_EXPENSE = "apiStatus/deleteExpense";
export const API_DELETE_EXPENSE_SUCCESS = "apiStatus/deleteExpense/success";
export const API_DELETE_EXPENSE_FAIL = "apiStatus/deleteExpense/fail";

/**
 * return an action's name from a string.
 * i.e. apiStatus/getExpenses         -> getExpenses
 * i.e. apiStatus/getExpenses/success -> getExpenses
 *
 * @param {string} type
 * @returns
 */
const getActionName = (type) => {
  return type.split("/")[1];
};

/**
 * Reducer for managing status for loading and error in each API
 *
 * @param {object} apiStatus
 * @param {object} action
 * @returns
 */
export const apiStatusReducer = (apiStatus = initialState, action) => {
  const actionName = getActionName(action.type);
  switch (action.type) {
    case API_GET_EXPENSES:
    case API_ADD_EXPENSE:
    case API_EDIT_EXPENSE:
    case API_DELETE_EXPENSE:
      return {
        ...apiStatus,
        [actionName]: {
          loading: true,
          error: "",
        },
      };
    case API_GET_EXPENSES_SUCCESS:
    case API_ADD_EXPENSE_SUCCESS:
    case API_EDIT_EXPENSE_SUCCESS:
    case API_DELETE_EXPENSE_SUCCESS:
      return {
        ...apiStatus,
        [actionName]: {
          loading: false,
          error: "",
        },
      };
    case API_GET_EXPENSES_FAIL:
    case API_ADD_EXPENSE_FAIL:
    case API_EDIT_EXPENSE_FAIL:
    case API_DELETE_EXPENSE_FAIL:
      return {
        ...apiStatus,
        [actionName]: {
          loading: false,
          error: action.payload.message,
        },
      };
    default:
      return apiStatus;
  }
};

/* Action Creators */

export const apiGetExpenses = () => {
  return {
    type: API_GET_EXPENSES,
  };
};

export const apiGetExpensesSuccess = () => {
  return {
    type: API_GET_EXPENSES_SUCCESS,
  };
};

export const apiGetExpensesFail = (error) => {
  return {
    type: API_GET_EXPENSES_FAIL,
    payload: error,
  };
};

export const apiAddExpense = () => {
  return {
    type: API_ADD_EXPENSE,
  };
};

export const apiAddExpenseSuccess = () => {
  return {
    type: API_ADD_EXPENSE_SUCCESS,
  };
};

export const apiAddExpenseFail = (error) => {
  return {
    type: API_ADD_EXPENSE_FAIL,
    payload: error,
  };
};

export const apiEditExpense = () => {
  return {
    type: API_EDIT_EXPENSE,
  };
};

export const apiEditExpenseSuccess = () => {
  return {
    type: API_EDIT_EXPENSE_SUCCESS,
  };
};

export const apiEditExpenseFail = (error) => {
  return {
    type: API_EDIT_EXPENSE_FAIL,
    payload: error,
  };
};

export const apiDeleteExpense = () => {
  return {
    type: API_DELETE_EXPENSE,
  };
};

export const apiDeleteExpenseSuccess = () => {
  return {
    type: API_DELETE_EXPENSE_SUCCESS,
  };
};

export const apiDeleteExpenseFail = (error) => {
  return {
    type: API_DELETE_EXPENSE_FAIL,
    payload: error,
  };
};

export const selectApiStatus = (state) => state.apiStatus;

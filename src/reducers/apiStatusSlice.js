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

const getActionName = (type) => {
  return type.split("/")[1];
};

export const apiStatusReducer = (apiStatus = initialState, action) => {
  const actionName = getActionName(action.type);
  switch (action.type) {
    case "apiStatus/getExpenses":
    case "apiStatus/addExpense":
    case "apiStatus/editExpense":
    case "apiStatus/deleteExpense":
      return {
        ...apiStatus,
        [actionName]: {
          loading: true,
          error: "",
        },
      };
    case "apiStatus/getExpenses/success":
    case "apiStatus/addExpense/success":
    case "apiStatus/editExpense/success":
    case "apiStatus/deleteExpense/success":
      return {
        ...apiStatus,
        [actionName]: {
          loading: false,
          error: "",
        },
      };
    case "apiStatus/getExpenses/fail":
    case "apiStatus/addExpense/fail":
    case "apiStatus/editExpense/fail":
    case "apiStatus/deleteExpense/fail":
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

export const apiGetExpenses = () => {
  return {
    type: "apiStatus/getExpenses",
  };
};

export const apiGetExpensesSuccess = () => {
  return {
    type: "apiStatus/getExpenses/success",
  };
};

export const apiGetExpensesFail = (error) => {
  return {
    type: "apiStatus/getExpenses/fail",
    payload: error,
  };
};

export const apiAddExpense = () => {
  return {
    type: "apiStatus/addExpense",
  };
};

export const apiAddExpenseSuccess = () => {
  return {
    type: "apiStatus/addExpense/success",
  };
};

export const apiAddExpenseFail = (error) => {
  return {
    type: "apiStatus/addExpense/fail",
    payload: error,
  };
};

export const apiEditExpense = () => {
  return {
    type: "apiStatus/editExpense",
  };
};

export const apiEditExpenseSuccess = () => {
  return {
    type: "apiStatus/editExpense/success",
  };
};

export const apiEditExpenseFail = (error) => {
  return {
    type: "apiStatus/editExpense/fail",
    payload: error,
  };
};

export const apiDeleteExpense = () => {
  return {
    type: "apiStatus/deleteExpense",
  };
};

export const apiDeleteExpenseSuccess = () => {
  return {
    type: "apiStatus/deleteExpense/success",
  };
};

export const apiDeleteExpenseFail = (error) => {
  return {
    type: "apiStatus/deleteExpense/fail",
    payload: error,
  };
};

export const selectApiStatus = (state) => state.apiStatus;

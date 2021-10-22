const initialState = [];
export const allExpensesReducer = (allExpenses = initialState, action) => {
  switch (action.type) {
    case "allExpenses/addExpense":
      return [...allExpenses, { ...action.payload, mode: "normal" }].sort(
        sortByDateDesc
      );
    case "allExpenses/editExpense":
      return allExpenses.map((item) =>
        item._id !== action.payload._id ? item : action.payload
      );
    case "allExpenses/deleteExpense":
      return allExpenses.filter((item) => item._id !== action.payload._id);
    case "allExpenses/changeModeToEdit":
      console.log("Called");
      return allExpenses.map((item) =>
        item._id !== action.payload._id
          ? item
          : {
              ...item,
              mode: "edit",
            }
      );
    case "allExpenses/changeModeToNormal":
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

export function addExpense(expense) {
  return {
    type: "allExpenses/addExpense",
    payload: expense,
  };
}

export function editExpense(expense) {
  return {
    type: "allExpenses/editExpense",
    payload: expense,
  };
}

export function deleteExpense(expense) {
  return {
    type: "allExpenses/deleteExpense",
    payload: expense,
  };
}

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

const sortByDateDesc = (a, b) => new Date(b.date) - new Date(a.date);
export const selectAllExpenses = (state) =>
  [...state.allExpenses].sort(sortByDateDesc);

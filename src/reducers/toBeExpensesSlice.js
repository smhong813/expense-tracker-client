let emptyExpenseId = 1;
const emptyExpenseTemplate = {
  description: "",
  amount: "",
  date: "",
  mode: "new",
};

const initialState = [];
export const toBeExpensesReducer = (toBeExpenses = initialState, action) => {
  switch (action.type) {
    case "toBeExpenses/addToBeExpense":
      const emptyExpense = {
        _id: emptyExpenseId++,
        ...emptyExpenseTemplate,
        date: new Date().toLocaleDateString("en-CA"),
      };
      return [...toBeExpenses, emptyExpense];
    case "toBeExpenses/deleteToBeExpense":
      return toBeExpenses.filter((item) => item._id !== action.payload._id);
    case "allExpenses/addExpense":
      return toBeExpenses.filter((item) => item._id !== action.payload._id); // might be different the name of the attribute for id
    default:
      return toBeExpenses;
  }
};

export function addToBeExpense(expense) {
  return {
    type: "toBeExpenses/addToBeExpense",
    payload: expense,
  };
}

export function deleteToBeExpense(expense) {
  return {
    type: "toBeExpenses/deleteToBeExpense",
    payload: expense,
  };
}

export const selectToBeExpenses = (state) => state.toBeExpenses;

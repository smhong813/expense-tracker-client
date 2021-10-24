// For making a temporary ID for an expense in the toBeExpenses array.
// This ID is only used for managing local items, not items from the server.
let emptyExpenseId = 1;
// An empty expense item to be added to the toBeExpenses array.
const emptyExpenseTemplate = {
  description: "",
  amount: "",
  date: "",
  mode: "new",
};

const initialState = [];
/**
 * Reducer for managing expenses to be entered by users before it is passed to the server
 *
 * @param {object[]} toBeExpenses
 * @param {object} action
 * @returns
 */
export const toBeExpensesReducer = (toBeExpenses = initialState, action) => {
  switch (action.type) {
    case "toBeExpenses/addToBeExpense":
      const emptyExpense = {
        _id: emptyExpenseId++, // increases by one for the next item
        ...emptyExpenseTemplate, // use the template defined above
        date: new Date().toLocaleDateString("en-CA"), // set the date to the date of today by default for providing convinience to users in terms of UX
      };
      return [...toBeExpenses, emptyExpense];
    case "toBeExpenses/deleteToBeExpense":
      return toBeExpenses.filter((item) => item._id !== action.payload._id);
    case "allExpenses/addExpense":
      return toBeExpenses.filter((item) => item._id !== action.payload._id);
    default:
      return toBeExpenses;
  }
};

/* Action Creators */

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

import { useSelector, useDispatch } from "react-redux";
import { selectAllExpenses } from "../../reducers/allExpensesSlice";
import { addToBeExpense } from "../../reducers/toBeExpensesSlice";
import styles from "./Header.module.css";

/**
 * Component for showing the title, the sub-total of expense, the total with taxes and the button for adding new expense
 * All numbers stand for the amount displays up to two decimal places.
 *
 * @component
 */
const Header = () => {
  const dispatch = useDispatch();
  const expenses = useSelector(selectAllExpenses); // Expenses for calculating the sub-total and the total with taxes

  // Calculate the sub-total
  const subtotal = expenses.reduce(
    (prev, item) => prev + Number(item.amount),
    0
  );
  const totalWithTaxes = subtotal * 1.15; // Calculate the total with taxes, 15% of the tax is applied

  // When the "Add new expense" button is cliked
  const onAddNewExpenseHandler = (e) => {
    dispatch(addToBeExpense());
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Expense tracker</h1>
      <div className={styles.totalContainer}>
        <p className={styles.totalText}>
          The sub-total of expenses is{" "}
          <span className={styles.amount}>${subtotal.toFixed(2)}</span>
        </p>
        <p className={styles.totalText}>
          The total with taxes is{" "}
          <span className={styles.amount}>${totalWithTaxes.toFixed(2)}</span>
        </p>
      </div>
      <button className={styles.button} onClick={onAddNewExpenseHandler}>
        Add new expense
      </button>
    </header>
  );
};

export default Header;

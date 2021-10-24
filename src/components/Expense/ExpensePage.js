import styles from "./ExpensePage.module.css";
import ExpenseList from "./ExpenseList";
import Header from "./Header";

/**
 * Component for showing the Expense Page.
 * Expense page contains a Header and ExpenseList.
 *
 * The reason why this ExpensePage component exists is to prepare for situations where the router is used.
 *
 * @component
 */
const ExpensePage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <ExpenseList />
    </div>
  );
};

export default ExpensePage;

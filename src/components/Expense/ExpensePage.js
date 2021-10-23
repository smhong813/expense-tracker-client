import styles from "./ExpensePage.module.css";
import ExpenseList from "./ExpenseList";
import Header from "./Header";

const ExpensePage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <ExpenseList />
    </div>
  );
};

export default ExpensePage;

import styles from "./ExpenseList.module.css";
import ExpenseRow from "./ExpenseRow";

const ExpenseList = () => {
  const expense = {
    _id: "abcde",
    description: "Fruits",
    amount: 13,
    date: "2021-10-20",
    createdAt: "2021-10-20",
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.listHeader}>
        <span className={styles.headerText}>Description</span>
        <span className={styles.headerText}>Amount</span>
        <span className={styles.headerText}>Taxes (15%)</span>
        <span className={styles.headerText}>Date</span>
        <span className={styles.headerText}></span>
      </div>
      <ul>
        <ExpenseRow item={expense} mode="normal" />
        <ExpenseRow item={expense} mode="normal" />
        <ExpenseRow item={expense} mode="edit" />
      </ul>
    </div>
  );
};

export default ExpenseList;

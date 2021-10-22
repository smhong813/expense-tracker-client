import { useSelector } from "react-redux";
import { selectAllExpenses } from "../../reducers/allExpensesSlice";
import { selectToBeExpenses } from "../../reducers/toBeExpensesSlice";
import styles from "./ExpenseList.module.css";
import ExpenseRow from "./ExpenseRow";
import iconCoin from "../../assets/images/coin.png";

const ExpenseList = () => {
  const toBeExpenses = useSelector(selectToBeExpenses);
  const allExpenses = useSelector(selectAllExpenses);

  console.log(allExpenses);
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
        {toBeExpenses.map((item) => (
          <ExpenseRow key={item._id} item={item} />
        ))}
        {allExpenses.map((item) => (
          <ExpenseRow key={item._id} item={item} />
        ))}
        {allExpenses.length === 0 && toBeExpenses.length === 0 && (
          <div className={styles.emptyData}>
            <img
              className={styles.coinImage}
              src={iconCoin}
              alt="A yellow coin"
            />
            <p>No expenses yet</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ExpenseList;

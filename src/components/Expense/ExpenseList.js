import { useDispatch, useSelector } from "react-redux";
import {
  loadExpenses,
  selectAllExpenses,
} from "../../reducers/allExpensesSlice";
import { selectToBeExpenses } from "../../reducers/toBeExpensesSlice";
import styles from "./ExpenseList.module.css";
import ExpenseRow from "./ExpenseRow";
import iconCoin from "../../assets/images/coin.png";
import { useEffect } from "react";
import { selectApiStatus } from "../../reducers/apiStatusSlice";

const ExpenseList = () => {
  const dispatch = useDispatch();

  const apiStatus = useSelector(selectApiStatus);
  const toBeExpenses = useSelector(selectToBeExpenses);
  const allExpenses = useSelector(selectAllExpenses);

  useEffect(() => {
    dispatch(loadExpenses());
  }, [dispatch]);

  return (
    <div className={styles.listContainer}>
      <Error apiStatus={apiStatus} />
      {!(allExpenses.length === 0 && toBeExpenses.length === 0) && (
        <div className={styles.listHeader}>
          <span className={styles.headerText}>Description</span>
          <span className={styles.headerText}>Amount</span>
          <span className={styles.headerText}>Taxes (15%)</span>
          <span className={styles.headerText}>Date</span>
          <span className={styles.headerText}></span>
        </div>
      )}
      {apiStatus.getExpenses.loading && <Loading />}
      {!apiStatus.getExpenses.loading &&
        allExpenses.length === 0 &&
        toBeExpenses.length === 0 && <NoExpenses />}
      <ul>
        {toBeExpenses.map((item) => (
          <ExpenseRow key={item._id} item={item} />
        ))}
        {allExpenses.map((item) => (
          <ExpenseRow key={item._id} item={item} />
        ))}
      </ul>
    </div>
  );
};

const Error = ({ apiStatus }) => {
  return (
    <>
      {apiStatus.getExpenses.error && (
        <p className={styles.error}>{apiStatus.getExpenses.error}</p>
      )}
      {apiStatus.addExpense.error && (
        <p className={styles.error}>{apiStatus.addExpense.error}</p>
      )}
      {apiStatus.editExpense.error && (
        <p className={styles.error}>{apiStatus.editExpense.error}</p>
      )}
      {apiStatus.deleteExpense.error && (
        <p className={styles.error}>{apiStatus.deleteExpense.error}</p>
      )}
    </>
  );
};

const Loading = () => {
  return (
    <div className={styles.loading}>
      <img
        className={styles.coinImage}
        src={iconCoin}
        alt="A rotating yellow coin"
      />
      <p>Loading...</p>
    </div>
  );
};

const NoExpenses = () => {
  return (
    <div className={styles.emptyData}>
      <img className={styles.coinImage} src={iconCoin} alt="A yellow coin" />
      <p>No expenses yet</p>
    </div>
  );
};

export default ExpenseList;

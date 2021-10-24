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

/**
 * Component for showing the expense list.
 *
 * Users can add, update and delete a expense in this component.
 * The reson why these functinalities are provided in one component is that I think it's the best way for users in terms of UX.
 * For this implementation it uses two arrays. One(toBeExpenses) is for listing all expenses stored in DB, and the other one(allExpenses) is for getting inputs before an expense is added to DB.
 *
 *
 * @component
 */
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

/**
 * Component for showing an error from the server.
 * Any error returned from the server is displayed here.
 *
 * @component
 * @param {object} apiStatus
 */
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

/**
 * Component for showing a loading image and text.
 *
 * A yellow coin is rotating while waiting for the data from the server.
 * @component
 */
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

/**
 * Component for showing a image and text that notify the list is empty.
 *
 * @component
 */
const NoExpenses = () => {
  return (
    <div className={styles.emptyData}>
      <img className={styles.coinImage} src={iconCoin} alt="A yellow coin" />
      <p>No expenses yet</p>
    </div>
  );
};

export default ExpenseList;

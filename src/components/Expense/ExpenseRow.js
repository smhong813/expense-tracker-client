import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addExpense,
  changeModeToEdit,
  changeModeToNormal,
  deleteExpense,
  editExpense,
} from "../../reducers/allExpensesSlice";
import { deleteToBeExpense } from "../../reducers/toBeExpensesSlice";

import EditableText from "../UI/EditableText";
import PrefixEditableText from "../UI/PrefixEditableText";
import styles from "./ExpenseRow.module.css";

/*
    It has three mode. 
    Normal, not editable 
    Edit, editable
    New, editable, save and cancel button.
*/
const ExpenseRow = (props) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(props.item); // names is for not making confusing
  const [error, setError] = useState("");

  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSaveHandler = (e) => {
    // Validation
    if (inputs.description.trim().length === 0 && inputs.amount.length === 0) {
      setError("Please check if description or amount is empty");
      setTimeout(() => setError(""), 1500);
      return;
    } else if (+inputs.amount <= 0) {
      setError("Amount must be a number greather than 0");
      setTimeout(() => setError(""), 1500);
      return;
    }

    if (props.item.mode === "new") {
      // call API and then add it to the list
      dispatch(addExpense(inputs)); // item from the server
    } else if (props.item.mode === "edit") {
      // call API and then update it frmo the list
      dispatch(editExpense(inputs)); // item from the server
    }
  };

  const onCancelHandler = (e) => {
    if (props.item.mode === "new") {
      dispatch(deleteToBeExpense(props.item));
    } else if (props.item.mode === "edit") {
      dispatch(changeModeToNormal(props.item));
    }
  };

  const onEditHandler = (e) => {
    dispatch(changeModeToEdit(props.item));
  };

  const onDeleteHandler = (e) => {
    dispatch(deleteExpense(props.item));
  };

  return (
    <li className={`${styles.row} ${styles[props.item.mode]}`}>
      <EditableText
        className={`${styles.description} ${styles[props.item.mode]}`}
        type="text"
        placeholder="Description"
        value={
          props.item.mode !== "normal"
            ? inputs.description
            : props.item.description
        }
        editable={props.item.mode !== "normal"}
        name="description"
        onChange={onInputChangeHandler}
      />
      <PrefixEditableText
        className={styles.amount}
        type="number"
        placeholder="Amount"
        prefix="$"
        value={
          props.item.mode !== "normal"
            ? inputs.amount
            : (+props.item.amount).toFixed(2)
        }
        editable={props.item.mode !== "normal"}
        name="amount"
        onChange={onInputChangeHandler}
      />
      <EditableText
        className={styles.date}
        type="date"
        placeholder="Date"
        value={props.item.mode !== "normal" ? inputs.date : props.item.date}
        editable={props.item.mode !== "normal"}
        name="date"
        onChange={onInputChangeHandler}
      />
      <span className={styles.tax}>
        +
        {(
          (props.item.mode !== "normal" ? +inputs.amount : props.item.amount) *
          0.15
        ).toFixed(2)}{" "}
        <span className={styles.taxInfo}>(15% tax)</span>
      </span>
      {props.item.mode === "normal" && (
        <div className={styles.buttonContainer}>
          <button className={styles.editButton} onClick={onEditHandler}>
            Edit
          </button>
          <button className={styles.deleteButton} onClick={onDeleteHandler}>
            Delete
          </button>
        </div>
      )}
      {props.item.mode !== "normal" && (
        <div className={styles.buttonContainer}>
          <button className={styles.saveButton} onClick={onSaveHandler}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={onCancelHandler}>
            Cancel
          </button>
        </div>
      )}
      {error && <div className={styles.errorContainer}>{error}</div>}
    </li>
  );
};

export default ExpenseRow;

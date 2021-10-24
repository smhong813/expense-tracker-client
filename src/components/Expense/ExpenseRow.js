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

/**
 * Component for showing a row in the expense list.
 * This component is for displaying the content of an expense and allowing users to edit(including add and delete).
 *
 * For its functions, it has three mode.
 * - normal  : for a display (not editable)
 * - new     : for adding (editable)
 * - edit    : for an update and a deletion (editable)
 *
 * It has only two type of validation, and an error is displayed on this row if something is invalidate.
 * 1. Checking empty value on both description and amount (date is filled with the default value - the date of today)
 * 2. Checking the amount is less than or equal to 0
 *
 * When its mode is new or edit it uses inputs state,
 * When its mode is normal it uses props.item
 *
 * @param {object} props
 */
const ExpenseRow = (props) => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(props.item); // state for entered inputs.
  const [error, setError] = useState(""); // state for error from validation.

  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // When the "Save" button is cliked.
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

    // Call different API according to the mode of this row.
    if (props.item.mode === "new") {
      dispatch(addExpense(inputs));
    } else if (props.item.mode === "edit") {
      dispatch(editExpense(inputs));
    }
  };

  // When the "Cancel" button is cliked.
  const onCancelHandler = (e) => {
    if (props.item.mode === "new") {
      dispatch(deleteToBeExpense(props.item));
    } else if (props.item.mode === "edit") {
      dispatch(changeModeToNormal(props.item));
    }
  };

  // When the "Edit" button is cliked.
  const onEditHandler = (e) => {
    dispatch(changeModeToEdit(props.item));
  };

  // When the "Delete" button is cliked.
  const onDeleteHandler = (e) => {
    dispatch(deleteExpense(props.item._id));
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

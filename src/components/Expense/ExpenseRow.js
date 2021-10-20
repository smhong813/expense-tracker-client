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
  return (
    <li className={styles.row}>
      <EditableText
        className={styles.description}
        type="text"
        placeholder="Description"
        value={props.item.description}
        editable={props.mode !== "normal"}
      />
      <PrefixEditableText
        className={styles.amount}
        type="number"
        placeholder="Amount"
        value={props.item.amount}
        editable={props.mode !== "normal"}
      />
      <EditableText
        className={styles.date}
        type="date"
        placeholder="Date"
        value={props.item.date}
        editable={props.mode !== "normal"}
      />
      <span className={styles.tax}>
        +{(props.item.amount * 0.15).toFixed(2)}{" "}
        <span className={styles.taxInfo}>(15% tax)</span>
      </span>
      {props.mode === "normal" && (
        <div className={styles.buttonContainer}>
          <button className={styles.editButton}>Edit</button>
          <button className={styles.deleteButton}>Delete</button>
        </div>
      )}
      {props.mode !== "normal" && (
        <div className={styles.buttonContainer}>
          <button className={styles.editButton}>Save</button>
          <button className={styles.deleteButton}>Cancel</button>
        </div>
      )}
    </li>
  );
};

export default ExpenseRow;

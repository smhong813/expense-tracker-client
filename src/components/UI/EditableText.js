import styles from "./EditableText.module.css";

const EditableText = (props) => {
  return (
    <input
      className={`${styles.input} ${props.className}`}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      disabled={!props.editable}
    />
  );
};

export default EditableText;
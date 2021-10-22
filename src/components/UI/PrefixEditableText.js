import EditableText from "./EditableText";
import styles from "./PrefixEditableText.module.css";

const PrefixEditableText = (props) => {
  return (
    <div className={`${styles.container} ${props.className}`}>
      <span className={styles.prefix}>{props.prefix}</span>
      <EditableText
        className={`${props.className} ${styles.editableText}`}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        editable={props.editable}
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  );
};

export default PrefixEditableText;

import EditableText from "./EditableText";
import styles from "./PrefixEditableText.module.css";

const PrefixEditableText = (props) => {
  console.log(props.editable);
  return (
    <div className={`${styles.container} ${props.className}`}>
      <span className={styles.prefix}>$</span>
      <EditableText
        className={`${props.className} ${styles.editableText}`}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        editable={props.editable}
      />
    </div>
  );
};

export default PrefixEditableText;

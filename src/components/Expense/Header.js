import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Expense tracker</h1>
      <div className={styles.totalContainer}>
        <p className={styles.totalText}>
          The sub-total of expenses is{" "}
          <span className={styles.amount}>$36.00</span>
        </p>
        <p className={styles.totalText}>
          The total with taxes is <span className={styles.amount}>$41.40</span>
        </p>
      </div>
      <button className={styles.button}>Add new expense</button>
    </header>
  );
};

export default Header;

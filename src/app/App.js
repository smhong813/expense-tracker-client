import styles from "./App.module.css";
import ExpenseList from "../components/Expense/ExpenseList";
import Header from "../components/Expense/Header";

function App() {
  return (
    <div className={styles.page}>
      <Header />
      <ExpenseList />
    </div>
  );
}

export default App;

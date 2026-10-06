import { useEffect, useState } from "react";
import API from "./api";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [budgetId, setBudgetId] = useState(null);

  const [totalSpent, setTotalSpent] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const [date, setDate] = useState("");
  const [particular, setParticular] = useState("");
  const [amount, setAmount] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState("");

  // -------------------------
  // Load Expenses
  // -------------------------

  const loadExpenses = () => {
    API.get("/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  };

  // -------------------------
  // Load Budget
  // -------------------------

  const loadBudget = () => {
    API.get("/budgets")
      .then((response) => {
        if (response.data.length > 0) {
          const currentBudget = response.data[0];

          setBudget(currentBudget.amount);
          setBudgetId(currentBudget.id);
          setBudgetAmount(currentBudget.amount);
        }
      })
      .catch((error) => {
        console.error("Error fetching budget:", error);
      });
  };

  // -------------------------
  // Load Total Spent
  // -------------------------

  const loadTotalSpent = () => {
    API.get("/expenses/total")
      .then((response) => {
        setTotalSpent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total spent:", error);
      });
  };

  // -------------------------
  // Load Remaining
  // -------------------------

  const loadRemaining = () => {
    API.get("/budgets/remaining")
      .then((response) => {
        setRemaining(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setRemaining(0);
        } else {
          console.error("Error fetching remaining budget:", error);
        }
      });
  };
  // -------------------------
  // Initial Load
  // -------------------------

  useEffect(() => {
    loadExpenses();
    loadBudget();
    loadTotalSpent();
  }, []);

  // -------------------------
  // Add Expense
  // -------------------------

  const handleAddExpense = () => {
    API.post("/expenses", {
      date: date,
      particular: particular,
      amount: Number(amount),
    })
      .then((response) => {
        setExpenses((previousExpenses) => [...previousExpenses, response.data]);

        loadTotalSpent();
        loadRemaining();

        setDate("");
        setParticular("");
        setAmount("");
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
      });
  };

  // -------------------------
  // Delete Expense
  // -------------------------

  const handleDeleteExpense = (id) => {
    API.delete(`/expenses/${id}`)
      .then(() => {
        setExpenses((previousExpenses) =>
          previousExpenses.filter((expense) => expense.id !== id),
        );

        loadTotalSpent();
        loadRemaining();
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
      });
  };

  // -------------------------
  // Edit Expense
  // -------------------------

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);

    setDate(expense.date);
    setParticular(expense.particular);
    setAmount(expense.amount);
  };

  // -------------------------
  // Update Expense
  // -------------------------

  const handleUpdateExpense = () => {
    API.put(`/expenses/${editingExpense.id}`, {
      date: date,
      particular: particular,
      amount: Number(amount),
    })
      .then((response) => {
        setExpenses((previousExpenses) =>
          previousExpenses.map((expense) =>
            expense.id === editingExpense.id ? response.data : expense,
          ),
        );

        loadTotalSpent();
        loadRemaining();

        setEditingExpense(null);
        setDate("");
        setParticular("");
        setAmount("");
      })
      .catch((error) => {
        console.error("Error updating expense:", error);
      });
  };

  // -------------------------
  // Edit Budget
  // -------------------------

  const handleEditBudget = () => {
    setEditingBudget(true);
    setBudgetAmount(budget);
  };

  // -------------------------
  // Update Budget
  // -------------------------

  const handleUpdateBudget = () => {
    API.put(`/budgets/${budgetId}`, {
      amount: Number(budgetAmount),
      month: "2026-10",
    })
      .then((response) => {
        setBudget(response.data.amount);
        setEditingBudget(false);

        loadRemaining();
      })
      .catch((error) => {
        console.error("Error updating budget:", error);
      });
  };

  const handleDeleteBudget = () => {
    API.delete(`/budgets/${budgetId}`)
      .then(() => {
        setBudget(0);
        setBudgetId(null);
        setBudgetAmount("");
        setRemaining(0);
        setEditingBudget(false);
      })
      .catch((error) => {
        console.error("Error deleting budget:", error);
      });
  };

  const handleSetBudget = () => {
    API.post("/budgets", {
      amount: Number(budgetAmount),
      month: "2026-10",
    })
      .then((response) => {
        setBudget(response.data.amount);
        setBudgetId(response.data.id);
        setBudgetAmount(response.data.amount);
        setEditingBudget(false);

        loadRemaining();
      })
      .catch((error) => {
        console.error("Error setting budget:", error);
      });
  };

  // -------------------------
  // UI
  // -------------------------

  return (
    <div className="app">
      <header>
        <h1>Expense Tracker</h1>
        <p>Manage your expenses and budget easily.</p>
      </header>

      {/* Summary */}

      <section className="summary">
        <div className="card">
          <h3>Monthly Budget</h3>

          {budgetId === null ? (
            <>
              <input
                type="number"
                placeholder="Enter budget"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
              />

              <button onClick={handleSetBudget}>Set Budget</button>
            </>
          ) : editingBudget ? (
            <div>
              <input
                type="number"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
              />

              <button onClick={handleUpdateBudget}>Save Budget</button>
            </div>
          ) : (
            <>
              <h2>₹{budget.toLocaleString("en-IN")}</h2>

              <div className="budget-actions">
                <button onClick={handleEditBudget}>Edit Budget</button>

                <button onClick={handleDeleteBudget}>Clear Budget</button>
              </div>
            </>
          )}
        </div>

        <div className="card">
          <h3>Total Spent</h3>

          <h2>₹{totalSpent.toLocaleString("en-IN")}</h2>
        </div>

        <div className="card">
          <h3>Remaining</h3>

          <h2>₹{remaining.toLocaleString("en-IN")}</h2>
        </div>
      </section>

      {/* Add / Edit Expense */}

      <section className="expense-form">
        <h2>{editingExpense ? "Edit Expense" : "Add Expense"}</h2>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Expense name"
          value={particular}
          onChange={(e) => setParticular(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={editingExpense ? handleUpdateExpense : handleAddExpense}
        >
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
      </section>

      {/* Recent Expenses */}

      <section className="expenses">
        <h2>Recent Expenses</h2>

        {expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          expenses.map((expense) => (
            <div className="expense" key={expense.id}>
              <div>
                <span>{expense.particular}</span>

                <span>₹{expense.amount}</span>
              </div>

              <button onClick={() => handleEditExpense(expense)}>Edit</button>

              <button onClick={() => handleDeleteExpense(expense.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;

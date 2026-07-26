import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AddExpenseModal from "../components/AddExpenseModal";
import ExpenseChart from "../components/ExpenseChart";
import { AppContext } from "../context/AppContext";

function GroupDetails() {

  const { id } = useParams();

  const {
    groups,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useContext(AppContext);

  const group = groups.find(
    (group) => String(group.id) === String(id)
  );

  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  if (!group) {
    return (
      <div className="layout">
        <Sidebar />

        <main className="dashboard">
          <h1>Group Not Found 😭</h1>
        </main>
      </div>
    );
  }

  const expenses = group.expenses || [];

  const handleAddExpense = async (expense) => {

    if (editingExpense) {

      await updateExpense(
        editingExpense._id,
        expense
      );

      setEditingExpense(null);

    } else {

      await addExpense(
        group.id,
        expense
      );

    }

    setShowModal(false);

  };

  const handleEdit = (expense) => {

    setEditingExpense(expense);
    setShowModal(true);

  };

  const handleDeleteExpense = async (expenseId) => {

    if (window.confirm("Delete this expense?")) {

      await deleteExpense(expenseId);

    }

  };

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const remainingBudget =
    group.budget - totalExpense;

  return (

    <div className="layout">

      <Sidebar />

      <main className="dashboard">

        <h1 className="page-title">
          {group.name} 🚀
        </h1>

        <div className="cards">

          <div className="glass stat-card">
            <p>Total Expense</p>
            <h2>₹{totalExpense}</h2>
          </div>

          <div className="glass stat-card">
            <p>Budget</p>
            <h2>₹{group.budget}</h2>
          </div>

          <div className="glass stat-card">
            <p>Remaining</p>
            <h2>₹{remainingBudget}</h2>
          </div>

          <div className="glass stat-card">
            <p>Members</p>
            <h2>{group.members.length}</h2>
          </div>

        </div>

        {/* Members */}

        <div className="group-section glass">

          <h2>👥 Members</h2>

          <div className="member-grid">

            {group.members.map((member, index) => (

              <div
                key={index}
                className="expense-card"
              >
                👤 {member}
              </div>

            ))}

          </div>

        </div>

        {/* Expenses */}

        <div className="group-section glass">

          <div className="section-header">

            <h2>💰 Expenses</h2>

            <button
              className="add-expense-btn"
              onClick={() => {

                setEditingExpense(null);
                setShowModal(true);

              }}
            >
              + Add Expense
            </button>

          </div>

          {expenses.length === 0 ? (

            <div className="expense-card">

              <h3>No Expenses Yet</h3>

              <p>Add your first expense</p>

            </div>

          ) : (

            <div className="expense-grid">

              {expenses.map((expense) => (

                <div
                  key={expense._id}
                  className="expense-card"
                >

                  <h3>
                    💸 {expense.title}
                  </h3>

                  <p>
                    <b>Paid By:</b> {expense.paidBy}
                  </p>

                  <p>
                    <b>Amount:</b> ₹{expense.amount}
                  </p>

                  <p>
                    <b>Members:</b> {expense.members}
                  </p>

                  <p>
                    <b>Per Person:</b> ₹
                    {(expense.amount / expense.members).toFixed(2)}
                  </p>

                  <div className="expense-actions">

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(expense)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteExpense(expense._id)
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        <ExpenseChart
          expenses={expenses}
          members={group.members}
        />

      </main>

      {showModal && (

        <AddExpenseModal
          closeModal={() => {

            setShowModal(false);
            setEditingExpense(null);

          }}
          addExpense={handleAddExpense}
          members={group.members}
          editExpense={editingExpense}
        />

      )}

    </div>

  );

}

export default GroupDetails;
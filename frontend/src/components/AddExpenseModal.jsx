import {
  useState,
  useEffect,
} from "react";

function AddExpenseModal({
  closeModal,
  addExpense,
  members = [],
  editExpense,
}) {

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [paidBy, setPaidBy] =
    useState(
      members[0] || ""
    );

  useEffect(() => {

    if (editExpense) {

      setTitle(editExpense.title);

      setAmount(editExpense.amount);

      setPaidBy(editExpense.paidBy);

    } else {

      setTitle("");

      setAmount("");

      setPaidBy(
        members[0] || ""
      );

    }

  }, [editExpense, members]);

  const handleSubmit = () => {

    if (
      !title ||
      !amount ||
      !paidBy
    ) {

      alert(
        "Fill all fields"
      );

      return;

    }

    addExpense({

      title,

      amount: Number(amount),

      paidBy,

      members:
        members.length,

    });

    closeModal();

  };

  return (

    <div className="modal-overlay">

      <div className="modal glass">

        <h2>

          {editExpense
            ? "✏️ Edit Expense"
            : "💰 Add Expense"}

        </h2>

        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
        />

        <select
          className="expense-select"
          value={paidBy}
          onChange={(e) =>
            setPaidBy(
              e.target.value
            )
          }
        >

          {members.map(
            (
              member,
              index
            ) => (

              <option
                key={index}
                value={member}
              >
                {member}
              </option>

            )
          )}

        </select>

        <div className="modal-buttons">

          <button
            className="btn"
            onClick={
              handleSubmit
            }
          >

            {editExpense
              ? "Update Expense"
              : "Save Expense"}

          </button>

          <button
            className="close-btn"
            onClick={
              closeModal
            }
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}

export default AddExpenseModal;
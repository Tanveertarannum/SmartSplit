import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { AppContext } from "../context/AppContext";

function Settlement() {

  const { groups } = useContext(AppContext);

  const settlements = [];

  groups.forEach((group) => {

    if (group.expenses.length === 0) return;

    const balances = {};

    group.members.forEach((member) => {
      balances[member] = 0;
    });

    const totalExpense = group.expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const share =
      totalExpense / group.members.length;

    group.expenses.forEach((expense) => {
      balances[expense.paidBy] += expense.amount;
    });

    group.members.forEach((member) => {
      balances[member] -= share;
    });

    settlements.push({
      group: group.name,
      totalExpense,
      balances,
    });

  });

  return (

    <div className="layout">

      <Sidebar />

      <main className="dashboard">

        <h1 className="page-title">
          Settlement Summary
        </h1>

        {settlements.length === 0 ? (

          <div
            className="glass"
            style={{
              padding: "40px",
              textAlign: "center",
              borderRadius: "20px",
            }}
          >

            <h2>No Settlements Available</h2>

            <p>
              Add some expenses to calculate
              settlements.
            </p>

          </div>

        ) : (

          <div className="settlement-grid">

            {settlements.map((item, index) => (

              <div
                key={index}
                className="glass settlement-card"
              >

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                  }}
                >

                  <h2 className="settlement-group">
                    {item.group}
                  </h2>

                  <span
                    style={{
                      background: "#7c3aed",
                      color: "#fff",
                      padding: "8px 15px",
                      borderRadius: "12px",
                      fontWeight: "600",
                    }}
                  >
                    ₹{item.totalExpense}
                  </span>

                </div>

                {Object.entries(item.balances).map(
                  ([member, balance]) => (

                    <div
                      key={member}
                      className={`member-balance ${
                        balance >= 0
                          ? "receive"
                          : "pay"
                      }`}
                    >

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >

                        <div className="avatar">

                          {member
                            .charAt(0)
                            .toUpperCase()}

                        </div>

                        <div>

                          <h4>{member}</h4>

                          <p>

                            {balance >= 0
                              ? "Will Receive"
                              : "Needs to Pay"}

                          </p>

                        </div>

                      </div>

                      <h3
                        style={{
                          color:
                            balance >= 0
                              ? "#22c55e"
                              : "#ef4444",
                        }}
                      >

                        ₹
                        {Math.abs(
                          balance
                        ).toFixed(2)}

                      </h3>

                    </div>

                  )
                )}

              </div>

            ))}

          </div>

        )}

      </main>

    </div>

  );

}

export default Settlement;
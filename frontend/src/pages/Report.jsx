import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { AppContext } from "../context/AppContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Bar,
  Pie,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Report() {

  const { groups } =
    useContext(AppContext);

  const totalGroups = groups.length;

  const totalMembers =
    groups.reduce(
      (sum, group) =>
        sum + group.members.length,
      0
    );

  const totalBudget =
    groups.reduce(
      (sum, group) =>
        sum + group.budget,
      0
    );

  const totalExpense =
    groups.reduce(
      (sum, group) =>
        sum +
        group.expenses.reduce(
          (expenseSum, expense) =>
            expenseSum +
            expense.amount,
          0
        ),
      0
    );

  const remainingBudget =
    totalBudget -
    totalExpense;

  let highestGroup = "-";
  let highestExpense = 0;

  groups.forEach((group) => {

    const spent =
      group.expenses.reduce(
        (sum, expense) =>
          sum + expense.amount,
        0
      );

    if (spent > highestExpense) {

      highestExpense = spent;
      highestGroup = group.name;

    }

  });

  // BAR CHART

  const barData = {

    labels:
      groups.map(
        (group) => group.name
      ),

    datasets: [
      {
        label: "Expenses",

        data:
          groups.map(
            (group) =>
              group.expenses.reduce(
                (sum, expense) =>
                  sum + expense.amount,
                0
              )
          ),

        backgroundColor:
          "#7c3aed",
      },
    ],

  };

  // PIE CHART

  const pieData = {

    labels: [
      "Spent",
      "Remaining",
    ],

    datasets: [
      {
        data: [
          totalExpense,
          remainingBudget,
        ],

        backgroundColor: [
          "#ef4444",
          "#22d3ee",
        ],
      },
    ],

  };

  return (

    <div className="layout">

      <Sidebar />

      <main className="dashboard">

        <h1 className="page-title">
          📊 Reports
        </h1>

        <div className="cards">

          <div className="glass stat-card">
            <p>Total Groups</p>
            <h2>{totalGroups}</h2>
          </div>

          <div className="glass stat-card">
            <p>Total Members</p>
            <h2>{totalMembers}</h2>
          </div>

          <div className="glass stat-card">
            <p>Total Budget</p>
            <h2>₹{totalBudget}</h2>
          </div>

          <div className="glass stat-card">
            <p>Total Expense</p>
            <h2>₹{totalExpense}</h2>
          </div>

          <div className="glass stat-card">
            <p>Remaining</p>
            <h2>₹{remainingBudget}</h2>
          </div>

          <div className="glass stat-card">
            <p>Highest Spending</p>
            <h2>{highestGroup}</h2>
          </div>

        </div>

        {/* BAR CHART */}

        <div className="group-section glass">

          <h2>
            📈 Expense By Group
          </h2>

          <Bar
            data={barData}
          />

        </div>

        {/* PIE CHART */}

        <div
          className="group-section glass"
          style={{
            maxWidth: "500px",
            margin: "30px auto",
          }}
        >

          <h2>
            🥧 Budget Usage
          </h2>

          <Pie
            data={pieData}
          />

        </div>

        {/* GROUP SUMMARY */}

        <div className="group-section glass">

          <h2>
            📁 Group Summary
          </h2>

          {groups.map((group) => {

            const spent =
              group.expenses.reduce(
                (sum, expense) =>
                  sum + expense.amount,
                0
              );

            return (

              <div
                key={group.id}
                className="expense-card"
              >

                <h3>
                  {group.name}
                </h3>

                <p>
                  👥 Members :
                  {" "}
                  {group.members.length}
                </p>

                <p>
                  💰 Budget :
                  ₹{group.budget}
                </p>

                <p>
                  💸 Spent :
                  ₹{spent}
                </p>

                <p>
                  🟢 Remaining :
                  ₹{group.budget - spent}
                </p>

              </div>

            );

          })}

        </div>

      </main>

    </div>

  );

}

export default Report;
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpenseChart({
  expenses,
  members,
}) {

  const memberTotals = {};

  members.forEach((member) => {
    memberTotals[member] = 0;
  });

  expenses.forEach((expense) => {

    const share =
      expense.amount / expense.members;

    members.forEach((member) => {
      memberTotals[member] += share;
    });

  });

  const data = {

    labels: Object.keys(memberTotals),

    datasets: [

      {

        label: "Expense Share",

        data: Object.values(memberTotals),

        backgroundColor: [

          "#7c3aed",
          "#22d3ee",
          "#f43f5e",
          "#10b981",
          "#f59e0b",
          "#3b82f6",
          "#ec4899",
          "#84cc16",

        ],

        borderColor: "#ffffff",

        borderWidth: 2,

      },

    ],

  };

  const options = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        position: "top",

        labels: {

          color: "#ffffff",

          font: {

            size: 14,

          },

        },

      },

    },

  };

  return (

    <div
      className="glass"
      style={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "15px",
        textAlign: "center",
      }}
    >

      <h2
        style={{
          marginBottom: "20px",
        }}
      >
         Expense Distribution
      </h2>

      <div
        style={{
          width: "350px",
          height: "350px",
          margin: "0 auto",
        }}
      >

        <Pie
          data={data}
          options={options}
        />

      </div>

    </div>

  );

}

export default ExpenseChart;
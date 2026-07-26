import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { AppContext } from "../context/AppContext";

function Dashboard() {

  const { groups } =
    useContext(AppContext);

  const totalGroups =
    groups.length;

  const totalBudget =
    groups.reduce(
      (sum, group) =>
        sum + group.budget,
      0
    );

  const totalMembers =
    groups.reduce(
      (sum, group) =>
        sum +
        group.members.length,
      0
    );

  return (
    <div className="layout">

      <Sidebar />

      <main className="dashboard">

        <h1 className="page-title">
          SmartSplit Dashboard
        </h1>

        <div className="cards">

          <div className="glass stat-card">
            <p>Total Groups</p>
            <h2>
              {totalGroups}
            </h2>
          </div>

          <div className="glass stat-card">
            <p>Total Budget</p>
            <h2>
              ₹{totalBudget}
            </h2>
          </div>

          <div className="glass stat-card">
            <p>Total Members</p>
            <h2>
              {totalMembers}
            </h2>
          </div>

        </div>

        <div className="group-section glass">

          <h2>
            Recent Groups
          </h2>

          {groups.map((group) => (

            <div
              key={group.id}
              className="expense-card"
            >

              <h3>
                {group.name}
              </h3>

              <p>
                👥
                {group.members.length}
                Members
              </p>

              <p>
                💰 Budget ₹
                {group.budget}
              </p>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
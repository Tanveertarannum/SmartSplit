import Sidebar from "../components/Sidebar";

function Notifications() {

  const notifications = JSON.parse(
    localStorage.getItem("notifications")
  ) || [];

  return (

    <div className="layout">

      <Sidebar />

      <main className="dashboard">

        <h1 className="page-title">
          🔔 Notifications
        </h1>

        {notifications.length === 0 ? (

          <div className="glass notification-card">

            <h2>No Notifications Yet</h2>

            <p>
              Activities will appear here.
            </p>

          </div>

        ) : (

          notifications
            .slice()
            .reverse()
            .map((item,index)=>(

              <div
                key={index}
                className="glass notification-card"
              >

                <h3>{item.message}</h3>

                <small>{item.time}</small>

              </div>

            ))

        )}

      </main>

    </div>

  );

}

export default Notifications;
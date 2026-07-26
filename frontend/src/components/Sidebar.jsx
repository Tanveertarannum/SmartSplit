import {
  LayoutDashboard,
  Users,
  BarChart3,
  Wallet,
  Bell,
  User,
  LogOut,
} from "lucide-react";

import { Link, useNavigate, useLocation } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <aside className="sidebar glass">

      <h1 className="logo">
        Smart<span>Split</span>
      </h1>

      <nav>

        <Link
          className={location.pathname==="/dashboard"?"active":""}
          to="/dashboard"
        >
          <LayoutDashboard size={20}/>
          Dashboard
        </Link>

        <Link
          className={location.pathname==="/groups"?"active":""}
          to="/groups"
        >
          <Users size={20}/>
          Groups
        </Link>

        <Link
          className={location.pathname==="/reports"?"active":""}
          to="/reports"
        >
          <BarChart3 size={20}/>
          Reports
        </Link>
        

        <Link
          className={location.pathname==="/settlement"?"active":""}
          to="/settlement"
        >
          <Wallet size={20}/>
          Settlement
        </Link>
        <Link
  to="/notifications"
  className={
    location.pathname === "/notifications"
      ? "active"
      : ""
  }
>
  <Bell size={20} />
  Notifications
</Link>


      </nav>

      <div className="sidebar-footer">

        <Link
          className="profile-btn"
          to="/profile"
        >
          <User size={20}/>
          Profile
        </Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={20}/>
          Logout
        </button>

      </div>

    </aside>

  );

}

export default Sidebar;
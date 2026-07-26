import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails";
import Settlement from "./pages/Settlement";
import Report from "./pages/Report";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
function App() {

  return (

    <Routes>
      <Route
  path="/notifications"
  element={<Notifications />}
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/groups"
  element={
    <ProtectedRoute>
      <Groups />
    </ProtectedRoute>
  }
/>

<Route
  path="/group/:id"
  element={
    <ProtectedRoute>
      <GroupDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/settlement"
  element={
    <ProtectedRoute>
      <Settlement />
    </ProtectedRoute>
  }
/>

<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Report />
    </ProtectedRoute>
  }
/>

    </Routes>

  );

}

export default App;
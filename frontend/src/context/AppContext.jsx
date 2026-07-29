import {
  createContext,
  useState,
  useEffect,
} from "react";

import API from "../api/api";

export const AppContext = createContext();

function AppProvider({ children }) {

  const [groups, setGroups] = useState([]);

  // ==========================
  // Fetch Groups
  // ==========================

  const fetchGroups = async () => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const res = await API.get(
        `/groups?userId=${user._id}`
      );

      const groupsData = await Promise.all(

        res.data.map(async (group) => {

          const expenseRes = await API.get(
            `/expenses/${group._id}`
          );

          return {
            ...group,
            id: group._id,
            expenses: expenseRes.data,
          };

        })

      );

      setGroups(groupsData);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchGroups();

  }, []);

  // ==========================
  // Add Group
  // ==========================

  const addGroup = async (group) => {

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      await API.post("/groups", {
        ...group,
        owner: user._id,
      });

      const notifications =
        JSON.parse(
          localStorage.getItem("notifications")
        ) || [];

      notifications.push({

        message: "✅ Group Created",

        time: new Date().toLocaleString(),

      });

      localStorage.setItem(

        "notifications",

        JSON.stringify(notifications)

      );

      fetchGroups();

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================
  // Add Expense
  // ==========================

  const addExpense = async (
    groupId,
    expense
  ) => {

    try {

      await API.post("/expenses", {

        ...expense,

        group: groupId,

      });

      const notifications =
        JSON.parse(
          localStorage.getItem("notifications")
        ) || [];

      notifications.push({

        message: "💰 Expense Added",

        time: new Date().toLocaleString(),

      });

      localStorage.setItem(

        "notifications",

        JSON.stringify(notifications)

      );

      fetchGroups();

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================
  // Update Expense
  // ==========================

  const updateExpense = async (
    expenseId,
    expense
  ) => {

    try {

      await API.put(

        `/expenses/${expenseId}`,

        expense

      );

      const notifications =
        JSON.parse(
          localStorage.getItem("notifications")
        ) || [];

      notifications.push({

        message: "✏️ Expense Updated",

        time: new Date().toLocaleString(),

      });

      localStorage.setItem(

        "notifications",

        JSON.stringify(notifications)

      );

      fetchGroups();

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================
  // Delete Expense
  // ==========================

  const deleteExpense = async (
    expenseId
  ) => {

    try {

      await API.delete(
        `/expenses/${expenseId}`
      );

      const notifications =
        JSON.parse(
          localStorage.getItem("notifications")
        ) || [];

      notifications.push({

        message: "🗑 Expense Deleted",

        time: new Date().toLocaleString(),

      });

      localStorage.setItem(

        "notifications",

        JSON.stringify(notifications)

      );

      fetchGroups();

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================
  // Delete Group
  // ==========================

  const deleteGroup = async (
    groupId
  ) => {

    try {

      await API.delete(
        `/groups/${groupId}`
      );

      const notifications =
        JSON.parse(
          localStorage.getItem("notifications")
        ) || [];

      notifications.push({

        message: "❌ Group Deleted",

        time: new Date().toLocaleString(),

      });

      localStorage.setItem(

        "notifications",

        JSON.stringify(notifications)

      );

      fetchGroups();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <AppContext.Provider

      value={{

        groups,

        fetchGroups,

        addGroup,

        addExpense,

        updateExpense,

        deleteExpense,

        deleteGroup,

      }}

    >

      {children}

    </AppContext.Provider>

  );

}

export default AppProvider;
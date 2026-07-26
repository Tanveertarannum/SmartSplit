import { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import CreateGroupModal from "../components/CreateGroupModal";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Groups() {

  const navigate = useNavigate();

  const {
    groups,
    addGroup,
    deleteGroup,
  } = useContext(AppContext);

  const [showModal, setShowModal] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const handleDelete = (
    e,
    groupId
  ) => {

    e.stopPropagation();

    if (
      window.confirm(
        "Delete this group?"
      )
    ) {
      deleteGroup(groupId);
    }

  };

  const filteredGroups =
    groups.filter((group) =>
      group.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div className="layout">

      <Sidebar />

      <main className="dashboard">

        <h1 className="page-title">
          👥 Groups
        </h1>

        <div className="create-btn-wrapper">

          <button
            className="create-group-btn"
            onClick={() =>
              setShowModal(true)
            }
          >
            ✨ Create Group
          </button>

        </div>

        <div className="search-wrapper">

          <input
            className="search-input"
            type="text"
            placeholder="🔍 Search Group..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <div className="groups-grid">

          {filteredGroups.length === 0 ? (

            <div className="glass group-box">

              <div>

                <h2>
                  No Groups Found 😔
                </h2>

                <p>
                  Try searching another group.
                </p>

              </div>

            </div>

          ) : (

            filteredGroups.map((group) => (

              <div
                key={group.id}
                className="group-box"
                onClick={() =>
                  navigate(
                    `/group/${group.id}`
                  )
                }
              >

                <div className="group-content">

                  <h2>
                    {group.name}
                  </h2>

                  <p>
                    👥 {group.members.length} Members
                  </p>

                  <p>
                    💰 Budget ₹{group.budget}
                  </p>

                  <p>
                    💸 Expenses {group.expenses.length}
                  </p>

                </div>

                <div
                  className="group-actions"
                >

                  <span
                    className="arrow"
                  >
                    →
                  </span>

                  <button
                    className="delete-btn"
                    onClick={(e) =>
                      handleDelete(
                        e,
                        group.id
                      )
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </main>

      {showModal && (

        <CreateGroupModal
          closeModal={() =>
            setShowModal(false)
          }
          addGroup={addGroup}
        />

      )}

    </div>

  );

}

export default Groups;